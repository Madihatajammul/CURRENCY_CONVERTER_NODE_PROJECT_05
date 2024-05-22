#! /usr/bin/env node

import chalk from "chalk"
import inquirer from "inquirer"

console.log( chalk.green.bold("\n#####################################################"));
console.log( chalk.green.bold("====================================================="));
console.log( chalk.blueBright.bold("\t Welcome To madiha zeeshan Currency Converter"));
console.log( chalk.redBright.bold("\t         current upto date rates"));
console.log( chalk.greenBright.bold("====================================================="));
console.log( chalk.greenBright.bold("#####################################################"));
console.log("\n");

let toArray = Object.keys(0)

let condition = true;

while (condition) {

let apilink = "https://v6.exchangerate-api.com/v6/85e01c20b1849a99f1adaa79/latest/USD"

let fetchdata= async (data:any)=>{
    let fetchdata = await fetch(data)
    let res = await fetchdata.json()
    return res.conversion_rates
}
let data = await fetchdata(apilink)
let countries = Object.keys(data)


let firstcountry = await inquirer.prompt({
    type:"list",
    name:"selectcountry",
    message: chalk.bold.hex("#E6007A") ("Coverting from..."),
    choices:countries
})
//console.log(`Converting from ${chalk.redBright.bold(firstcountry.selectcountry)}`)
let money =await inquirer.prompt({
    type:"number",
    name:"money2",
    message:`Enter money in ${chalk.redBright.bold(firstcountry.selectcountry)} `,

})
//console.log(money.money2)

let secondcountry = await inquirer.prompt({
    type:"list",
    name:"selectcountry",
    message: chalk.bold.hex("#E6007A") ("Coverting to..."),
    choices:countries
})

let cnv = `https://v6.exchangerate-api.com/v6/85e01c20b1849a99f1adaa79/pair/${firstcountry.selectcountry}/${secondcountry.selectcountry}`
//console.log(cnv)

let cnvdata= async (data:any)=>{
    let cnvdata = await fetch(data)
    let res = await cnvdata.json()
    return res.conversion_rate;
}
let a = await cnvdata(cnv);

//console.log(a)
let cnvrate = money.money2 * a
console.log(`Your Converted currency is ${cnvrate.toFixed(2)}`)

let check = await inquirer.prompt(
    {
        name: "check",
        type: "confirm",
        message: chalk.bold.hex("#F7E700")("Do you want to convert more ?"),
        default: "false"
    }

)
condition = check.check
if (condition == false) {

    console.log( chalk.greenBright.bold("\n\n=========================================================="));
    console.log( chalk.redBright.bold("\t\tGood BY Come Back Later"));
    console.log( chalk.greenBright.bold("=========================================================="));

}

}