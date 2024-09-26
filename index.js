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

const namekey = ["Title","Description","Installation","Usage Information","contribution Guidlines","Test Instructions","License","Questions"]

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
        
        const augmentedArry = {};
        
        for(const index in res){
            
            if(index === "github"){
                augmentedArry.questions = [];
                augmentedArry.questions.push(res[index]);
            }else if(index === "Installation"){
                augmentedArry.table_of_content = '';
                augmentedArry[index] = res[index];
            }else if(index === "email"){
                augmentedArry.questions.push(res[index]);

            }else{
                augmentedArry[index] = res[index];
            }

        }
        let writeData ="";
        for(const index in augmentedArry){

            if(index == "Title"){
                writeData += `# ${augmentedArry[index]}\n`;
            }else if(index == "table_of_content"){
                writeData += `## Table of Contents\n- [Installation](#Installation)\n- [Usage Information](#UsageInformation)\n`;
        
            }else if(index == "questions" ){
                writeData += `## Questions\n- GIT HUB: ${augmentedArry.questions[0]}\n- Email: ${augmentedArry.questions[1]}\n`;        
            }else{
                writeData += `## ${index}\n${augmentedArry[index]}\n`; 

            }
        }
        writeToFile('SampleREADME.md',writeData);


    })
   

    
                    





}

// Function call to initialize app
init();
