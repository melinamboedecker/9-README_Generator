// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter project name:',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter the description here:',
    },
    {
        type: 'input',
        name: 'contents',
        message: 'Enter Table of Contents',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Enter Installation Information',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Enter instructions and examples for use',
    },
    {
        type: 'input',
        name: 'screenshot',
        message: 'add path for screenshot',
    },
    {
        type: 'input',
        name: 'link',
        message: 'add link to deployed page',
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Enter credits here:',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license',
        choices: ['MIT', 'A', 'B'],

    }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, 
        '# ' +data.name+ '\n'+
        '## Description: \n'+
        data.description+ '\n'+
        '## Table of Contents: \n'+
        '* [Installation](#installation)\n'+
        '* [Usage](#usage) \n'+
        '* [License](#license) \n'+
        '* [Contributing](#contributing) \n'+
        '* [Tests](#tests) \n'+
        '* [Questions](#questions) \n'+
        '## Installation: \n'+
        '## Usage: \n'+
        data.usage+ '\n'+
        '![Screenshot]('+data.screenshot+')\n'+
        '## Link: \n'+
        data.link+'\n'+
    
        '## License: \n'+
        data.license+'\n'+
        '## Contributing\n'+
        data.contributing+'\n'+
        '## Tests: \n'+
        // data.license+'\n'+
        '## Questions\n'+
        data.contributing+'\n'

        , (err) => err ? console.log(err) : console.log('Readme file created!'));
}

// TODO: Create a function to initialize app
function init() {
    const inquirer = require('inquirer');
    inquirer.prompt(questions)
    .then((data) => {
        console.log(data);
        writeToFile('readme.md', data);
    })
    
}

// Function call to initialize app
init();
