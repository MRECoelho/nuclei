# Nuclei
_A note making app inspired by workflowy._

## Getting started
If (you're not familiar with workflowy and) you like to work with lists that support a hierarchical structure, i.e. parent child relations, this might be for you.
This app is created with React and supports drag operations and keyboard short cuts to create and adjust your list to your liking. Finished all items on your list? Mark it complete or delete the that part of the list.
Currently the list is not persistent and lives in the DOM, support for IndexedDB is on its way.

### Navigate the list
Also support for keyboard navigation. Use the 'ArrowUp' or 'ArrowDown' to select the previous or next atom  respectively.

### Create a new item
A list will always have at least one node and can be deleted, however a new atom will be create to ensure no empty list exist. To create a new atom, select and existing atom and press `control + enter` the create a new atom. Depending on your current list structure it will either create a sibling atom or child atom.

### Edit an atom
Atoms have a title and possibly a field for additional notes. Editting an atom is a as simple as focussing the particular atom. Use the `shift + enter` keyboard shortcut to quickly select/create the note of the selected atom.

<!-- ### Complete atom
Mark an atom or a subtree as complete by using the ? keyboard shortcut. -->

### In- and outdenting atoms
Use the `tab`  keyboard shortcut to indent an atom (and its children) and `shift + tab` to outdent.

### Hide/show child atoms
To prevent clutter you can hide parts of your list. Use the `ctrl + ArrowLeft` keyboard short cut to hide the children of the selected atom and `ctrl + ArrowRight` to show them again.

### Delete atom
Deleting an atom can be done be deleting all the text. To delete an atom and all its children, you'll need to use the _force delete_ command (`ctrl + backspace`).

### Keyboard shortcuts
|Command|Shortcut|
|---|---|
| add atom | ctrl+enter |
| collapse atom| ctrl+ArrowLeft |
| expand atom | ctrl+ArrowRight |
| indent atom | tab |
| outdent atom | shift+tab |
| focus previous atom| ArrowUp |
| focus next atom | ArrowDown |
| focus/create notes | shift+enter |
| delete atom/notes | backspace |
| force delete atom | ctrl+backspace |