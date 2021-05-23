// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');

// const requireEmail = (value) => {
//     if (/\w/.test)
// }

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
        choices: ['MIT', 'Apache', 'GPL', 'no license'],
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
        validate(value) {
            const okay = value.includes('@') && value.includes('.');
            if (okay) {
                return true;
            }

            return "Please enter a valid email address"
        }   
    }
];

var licenseBadge;
var licenseLink;

function getBadge (chosenLicense) {
    if (chosenLicense === 'MIT') {
        licenseBadge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
        licenseLink = '## License: \n Licensed under the [MIT](https://opensource.org/licenses/MIT) license.';
    } else {
        if (chosenLicense === 'Apache') {
            licenseBadge = '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
            licenseLink = '## License: \n Licensed under the [Apache](https://opensource.org/licenses/Apache-2.0) license.';
        } else {
            if (chosenLicense === 'GPL') {
                licenseBadge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
                licenseLink = '## License: \n Licensed under the [GPL](https://www.gnu.org/licenses/gpl-3.0) license.';
            } else {
                licenseBadge = ''
                licenseLink = ''
            }
        }
    }
}




// TODO: Create a function to write README file
function writeToFile(fileName, data) { 
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
        data.usage + '\n'+
        '![Screenshot]('+data.screenshot+')\n'+
        '[Deployed page](#'+data.link+'\n'+
       
     
        `${licenseLink} \n`+
        
        '## Contributing: \n'+
        data.contributing+'\n'+

        '## Tests: \n'+
        data.tests+'\n'+
        
        '## Questions: \n'+
        'GitHub: ['+data.githubusername+'](#https://github.com/'+data.githubusername+') \n'+
        '\n'+
        'If you have any additional questions, please contact me at '+data.email+'\n'

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
