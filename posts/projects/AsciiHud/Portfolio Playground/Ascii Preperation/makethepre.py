import os
import glob

# Get the absolute path of the directory containing the current script
dir_path = os.path.dirname(os.path.abspath(__file__))

# Change the current working directory to the script directory
os.chdir(dir_path)

ascii_folder = 'Ascii Txt'
output_file = 'ascii_art1.html'

# Get all .txt files in the 'Ascii Txt' folder
txt_files = [os.path.join(ascii_folder, 'fragileLogo_001.txt'), os.path.join(
    ascii_folder, 'fragileLogo_002.txt')]

# Initialize the HTML content
html_content = '<!DOCTYPE html>\n<html>\n<head>\n<meta charset="UTF-8">\n<title>ASCII Art</title>\n</head>\n<body>\n'

# Iterate through each .txt file
for idx, txt_file in enumerate(txt_files, start=1):
    # Read the content of the .txt file
    with open(txt_file, 'r', encoding='utf-8') as file:
        file_content = file.read()

    # Create a pre tag with the required format
    pre_tag = f'<pre id="ASCII-{idx:03d}" name="{os.path.basename(txt_file)}">\n{file_content}\n</pre>\n'

    # Append the pre tag to the HTML content
    html_content += pre_tag

# Close the HTML tags
html_content += '</body>\n</html>'

# Write the HTML content to the output file
with open(output_file, 'w', encoding='utf-8') as file:
    file.write(html_content)

print(f"ASCII art HTML file created at: {output_file}")
