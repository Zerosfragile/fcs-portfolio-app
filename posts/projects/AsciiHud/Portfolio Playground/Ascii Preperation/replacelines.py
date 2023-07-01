import os

# Get the absolute path of the directory containing the current script
dir_path = os.path.dirname(os.path.abspath(__file__))

# Change the current working directory to the script directory
os.chdir(dir_path)

file = "whirl"
index = "001"
# New filename with directory and extension
new_file = os.path.join("Ascii Txt", file + "_" + index + ".txt")

# Open the original file and read its contents
with open(new_file, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Remove every other line from the list
new_lines = lines[::2]

# Open a new file and write the new lines to it
with open(new_file, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
