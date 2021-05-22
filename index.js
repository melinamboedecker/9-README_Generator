// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'Enter project title:',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter the description here:',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Enter installation instructions',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Enter usage instructions and examples for use',
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
        message: 'Enter contribution guidelines:',
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Enter test instructions',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license',
        choices: ['MIT', 'Apache', 'GPL'],
    },
    {
        type: 'input',
        name: 'githubusername',
        message: 'Enter your GitHub user name',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address',
        // validate: function(input) {
        //     if (input.includes("@")) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // }

    }
];

var licenseBadge;
var licenseLink;

function getBadge (chosenLicense) {
    if (chosenLicense === 'MIT') {
        licenseBadge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
        licenseLink = '[MIT](https://opensource.org/licenses/MIT)';
    } else {
        if (chosenLicense === 'Apache') {
            licenseBadge = '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)'
        } else {
            if (chosenLicense === 'GPL') {
                licenseBadge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)'
            }
        }
    }
}




// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    console.log('PPPPPPPPPPPPPPPPPPP')
    console.log(data.license)
    getBadge(data.license)
    fs.writeFile(fileName, 
        '# ' +data.title+ '\n'+
        `${licenseBadge} \n`+
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
        `Licensed under the ${licenseLink} license. \n`+
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
        writeToFile(`${data.title}_readme.md`, data);
    })
    
}

// Function call to initialize app
init();
