// TODO: Include packages needed for this application
import inquirer from "inquirer";
import fs from "fs";

// TODO: Create an array of questions for user input
const questions = [
                    "Enter your Project Title",
                    "Enter Project Description",
                    "Installations Instructions",
                    "Usage Information",
                    "Contribution Guidelines",
                    "Test Instructions",
                    "Select License for Your Application",
                    "Enter Your GitHub Username",
                    "Enter Your Email Address"
                    ];
                    
const promptarray = [];

const namekey = ["Title","Description","Installation","Usage_Information","contribution_Guidlines","Test_Instructions","License","Questions"]

let promptObj={  type:"input",
                 message:"your project name",
                 name:"title"};
function makepromptarray(){

        questions.forEach((data,index)=>{
            if(index==6){
                promptObj = 
                {
                    type:"checkbox",
                    message:data,
                    name:namekey[index],
                    choices:["MIT","Apache 2.0"] 
                };
            }else if(index==7 || index==8){
                promptObj = 
                {
                    type:"input",
                    message:data,
                    name:index==7?"github":"email"
                };
            }else{
                promptObj = 
                {
                    type:"input",
                    message:data,
                    name:namekey[index]
                };

            }
            promptarray.push(promptObj);

        });

       
    
        
 

   
        
}
// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName,data,(err)=>err?console.log(err):console.log("File ReadMe Created!!"));
}

// TODO: Create a function to initialize app
function init() {
    
    makepromptarray();
    inquirer.prompt(promptarray).then((res)=>{
        console.log(res);
        let writeData ="";
        for(const index in res){

            if(index == "Title"){
                writeData += `# ${res[index]}\n`;
            }else if(index == "Installation"){
                writeData += `## Table of Contents\n- [Installation](#Installation)\n- [Usage_Information](#Usage Information)\n`;
            }else if(index == "github" ){
                writeData += `## Questions\n- ${res[index]}\n- ${res["email"]}\n`;        
            }else{
                writeData += `## ${index}\n${res[index]}\n`; 

            }
        }
        writeToFile('SampleREADME.md',writeData);


    })
   

    
                    





}

// Function call to initialize app
init();
