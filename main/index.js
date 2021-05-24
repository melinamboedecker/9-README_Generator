// packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');


//array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'Enter project title:',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter your project description here:',
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
        name: 'link',
        message: 'add link to deployed page if desired',
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

//variablefor license badge
var licenseBadge;
//variable for license link
var licenseLink;

//fuction to get the correct badge and link for chosen license
function getBadge (chosenLicense) {
    if (chosenLicense === 'MIT') {
        licenseBadge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
        licenseLink = 'Licensed under the [MIT](https://opensource.org/licenses/MIT) license.';
    } else {
        if (chosenLicense === 'Apache') {
            licenseBadge = '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
            licenseLink = 'Licensed under the [Apache](https://opensource.org/licenses/Apache-2.0) license.';
        } else {
            if (chosenLicense === 'GPL') {
                licenseBadge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
                licenseLink = 'Licensed under the [GPL](https://www.gnu.org/licenses/gpl-3.0) license.';
            } else {
                licenseBadge = ''
                licenseLink = 'none'
            }
        }
    }
}

//variable and function for adding link to deployed page if entered
var deployedPage;
function getAppLink (link) {
    if (!link) {
        deployedPage = '';
    } else {
        deployedPage = `\n[Click here for deployed page](`+link+')'
    }
}


//  function to write README file with data per users input
function writeToFile(fileName, data) { 
    getBadge(data.license)
    getAppLink(data.link)
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
        data.installation+'\n'+
        '## Usage: \n'+
        data.usage+'\n'+
        
        `\n${deployedPage}\n`+
       
        '## License: \n'+
        `${licenseLink} \n`+
        
        '## Contributing: \n'+
        data.contributing+'\n'+

        '## Tests: \n'+
        data.tests+'\n'+
        
        '## Questions: \n'+
        'GitHub: ['+data.githubusername+'](https://github.com/'+data.githubusername+') \n'+
        '\n'+
        'If you have any additional questions, please contact me at '+data.email+'\n'

        , (err) => err ? console.log(err) : console.log('Readme file created!'));
}

//function to initialize app
function init() {
    const inquirer = require('inquirer');
    inquirer.prompt(questions)
    .then((data) => {
        console.log(data);
        writeToFile(`README.md`, data);
    })
    
}

// Function call to initialize app
init();
