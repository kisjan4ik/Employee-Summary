const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const allEmployee = []


    function manager() {

        inquirer.prompt([
            {
                type: "input",
                message: "What is your manager's name?",
                name: "managerName"
            },
            {
                type: "input",
                message: "What is your manager's ID?",
                name: "managerId"
            },
            {
                type: "input",
                message: "What is your manager's email?",
                name: "managerEmail"
            },
            {
                type: "input",
                message: "What is your manager's office number?",
                name: "managerOfficeNumber"
            },
        ]).then(function (response) {

            const manager = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerOfficeNumber);
            allEmployee.push(manager);
            teamMembers();
        });

    }

    function teamMembers() {
        inquirer.prompt([
            {
                type: "list",
                name: "teamMember",
                message: "What type of team member would you like to add?",
                choices: [
                    "Engineer",
                    "Intern",
                    "I don't want to add any more team members"
                ]
            },

        ]).then(function (response) {

            if (response.teamMember === "Engineer") {
                newEngineer();
            }
            else if (response.teamMember === "Intern") {
                newIntern();
            }
            else {
                completedTeam();
            }
        });
    }

    function newEngineer() {

        inquirer.prompt([
            {
                type: "input",
                message: "What is your engineer's name?",
                name: "engineerName"
            },
            {
                type: "input",
                message: "What is your engineer's ID?",
                name: "engineerId"
            },
            {
                type: "input",
                message: "What is your engineer's email?",
                name: "engineerEmail"
            },
            {
                type: "input",
                message: "What is your engineer's GitHub username?",
                name: "engineerGitHub"
            },
        ]).then(function (response) {

            const engineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerGitHub);
            allEmployee.push(engineer);
            teamMembers();
        });

    }

    function newIntern() {

        inquirer.prompt([
            {
                type: "input",
                message: "What is your intern's name?",
                name: "internName"
            },
            {
                type: "input",
                message: "What is your intern's ID?",
                name: "internId"
            },
            {
                type: "input",
                message: "What is your intern's email?",
                name: "internEmail"
            },
            {
                type: "input",
                message: "What is your intern's school?",
                name: "internSchool"
            },
        ]).then(function (response) {

            const intern = new Intern(response.internName, response.internId, response.internEmail, response.internSchool);
            allEmployee.push(intern);
            teamMembers();
        });

    }

    function completedTeam() {
        console.log(`Employee log successfully generated!`);

    
    fs.writeFile(outputPath, render(allEmployee), (err) => {
        if(err){
            return err;
        }
    }) ;

    }

    manager();


