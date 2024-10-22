from bs4 import BeautifulSoup, NavigableString
from datetime import datetime
import re
import sys
import os
from urllib.parse import unquote
import shutil
import nltk
from pathlib import Path

def convert_date(date_str):
    """Convert date string to the required format (Jul 8 2022)"""
    try:
        date_obj = datetime.strptime(date_str.strip(), "%A, %B %d, %Y")
        return date_obj.strftime("%b %-d %Y")  # %-d removes leading zeros
    except:
        return date_str

def clean_text(text):
    """Clean text content by removing extra whitespace and newlines"""
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def get_description(body_text):
    """Extract first two sentences from the text"""
    try:
        try:
            nltk.data.find('tokenizers/punkt')
        except LookupError:
            nltk.download('punkt', quiet=True)

        sentences = nltk.sent_tokenize(body_text)
        if len(sentences) >= 2:
            return ' '.join(sentences[:2])
        return sentences[0] if sentences else ''
    except:
        parts = body_text.split('.')
        if len(parts) >= 2:
            return f"{parts[0].strip()}.{parts[1].strip()}."
        return f"{parts[0].strip()}." if parts else ''

def process_image(img_element, image_dir, title_slug):
    """Process image elements and return markdown image syntax"""
    src = img_element.get('src', '')
    alt = img_element.get('alt', '')

    if not src or src.startswith('data:'):
        return ''

    src = unquote(src)
    filename = os.path.basename(src)
    new_filename = f"{title_slug}-{filename}"
    new_path = f"/images/blog/{new_filename}"

    return f"![{alt}]({new_path})"

def process_link(a_element):
    """Process anchor elements and return markdown link syntax"""
    href = a_element.get('href', '')
    if not href:
        return clean_text(a_element.get_text())

    text = clean_text(a_element.get_text())
    if not text:
        return ''

    # Handle target="_blank" by adding reference-style link
    if a_element.get('target') == '_blank':
        return f'[{text}]({href}){{target="_blank"}}'

    return f'[{text}]({href})'

def create_slug(title):
    """Create a URL-friendly slug from the title"""
    slug = title.lower()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'\s+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    return slug.strip('-')

def process_paragraph(p_element, image_dir, title_slug):
    """Process a paragraph element that might contain text, images, and links"""
    content = []
    current_text = []

    for child in p_element.children:
        if isinstance(child, NavigableString):
            text = clean_text(str(child))
            if text:
                current_text.append(text)
        elif child.name == 'img':
            if current_text:
                content.append(' '.join(current_text))
                current_text = []
            img_markdown = process_image(child, image_dir, title_slug)
            if img_markdown:
                content.append(img_markdown)
        elif child.name == 'a':
            # Process link and add it to current text
            link_markdown = process_link(child)
            if link_markdown:
                current_text.append(link_markdown)
        elif child.name:
            # Handle other nested elements
            if child.name == 'strong' or child.name == 'b':
                text = f"**{clean_text(child.get_text())}**"
            elif child.name == 'em' or child.name == 'i':
                text = f"*{clean_text(child.get_text())}*"
            else:
                text = clean_text(child.get_text())
            if text:
                current_text.append(text)

    if current_text:
        content.append(' '.join(current_text))

    return content

def html_to_markdown(html_content, image_dir):
    soup = BeautifulSoup(html_content, 'html.parser')

    title = soup.select_one('.title')
    title = title.text.strip() if title else "Untitled"
    title_slug = create_slug(title)

    date = soup.select_one('#date')
    date = convert_date(date.text) if date else "No date"

    body = soup.select_one('#body')
    if not body:
        return "Error: Could not find main content"

    body_text = clean_text(body.get_text())
    description = get_description(body_text)

    frontmatter = f"""---
title: '{title}'
description: '{description}'
pubDate: '{date}'
---
"""

    content = []
    for element in body.children:
        if isinstance(element, NavigableString):
            continue

        if element.name == 'p':
            paragraph_content = process_paragraph(element, image_dir, title_slug)
            content.extend(paragraph_content)
        elif element.name == 'img':
            img_markdown = process_image(element, image_dir, title_slug)
            if img_markdown:
                content.append(img_markdown)
        elif element.name == 'a':
            # Handle standalone links
            link_markdown = process_link(element)
            if link_markdown:
                content.append(link_markdown)
        elif element.name in ['h1', 'h2', 'h3']:
            text = clean_text(element.get_text())
            if text:
                content.append(f"{'#' * int(element.name[1])} {text}")
        elif element.name in ['ol', 'ul']:
            for i, li in enumerate(element.find_all('li'), 1):
                text = clean_text(li.get_text())
                if text:
                    if element.name == 'ol':
                        content.append(f"{i}. {text}")
                    else:
                        content.append(f"- {text}")

    markdown_content = frontmatter + "\n" + "\n\n".join(filter(None, content))
    markdown_content = re.sub(r'\n{3,}', '\n\n', markdown_content)

    return markdown_content, title_slug

def process_directory(input_dir, output_dir, image_dir):
    """Process all HTML files in a directory recursively"""
    os.makedirs(output_dir, exist_ok=True)
    os.makedirs(image_dir, exist_ok=True)

    input_path = Path(input_dir)
    html_files = list(input_path.rglob('*.html'))

    for html_file in html_files:
        try:
            rel_path = html_file.relative_to(input_path)
            output_path = Path(output_dir) / rel_path.with_suffix('.md')

            output_path.parent.mkdir(parents=True, exist_ok=True)

            with open(html_file, 'r', encoding='utf-8') as f:
                html_content = f.read()

            markdown_content, title_slug = html_to_markdown(html_content, image_dir)

            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(markdown_content)

            print(f"Converted: {html_file} -> {output_path}")

        except Exception as e:
            print(f"Error processing {html_file}: {str(e)}")

def main():
    if len(sys.argv) != 3:
        print("Usage: python script.py input_directory output_directory")
        return

    input_dir = sys.argv[1]
    output_dir = sys.argv[2]
    image_dir = "public/images/blog"

    try:
        process_directory(input_dir, output_dir, image_dir)
        print("Conversion completed successfully!")

    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    main()