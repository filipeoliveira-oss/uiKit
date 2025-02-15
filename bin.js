#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import readline from "readline";
import https from "https";
import inquirer from "inquirer";

const availableComponents = [
    { name: "Actions Menu", value: "actionsMenu" },
    { name: "Button", value: "button" },
    { name: "Currency Input", value: "currencyInput" },
    { name: "Data Table", value: "dataTable" },
    { name: "Drawer", value: "drawer" },
    { name: "Dropdown", value: "dropdown" },
    { name: "Input Mask", value: "maskInput" },
    { name: "Modal", value: "modal" },
];

async function main() {
    const component = await getDesiredComponent()

    const repoUrl = "https://raw.githubusercontent.com/filipeoliveira-oss/uiKit/refs/heads/main/src/components";
    const fileUrl = `${repoUrl}/${component}/${component}.tsx`;
    const depsUrl = `${repoUrl}/${component}/${component}.deps.json`;
    const dest = `./src/components/uiKit/${component}.tsx`;

    const tailwindVersion = execSync("npm show tailwindcss version").toString();

    if (!tailwindVersion) {
        console.log(
            `Tailwind is required for this library to work, please refer to Tailwind's docs: https://tailwindcss.com/docs/installation`
        );

        process.exit(1)
    }

    if (Number(tailwindVersion.split(".")[0]) < 4) {
        console.log(
            `Tailwind's version is too old, please refer to Tailwind's migration website: https://tailwindcss.com/docs/upgrade-guide`
        );

        
        process.exit(1)
    }

    fs.readFile(dest, "utf-8", async (err, data) => {
        if (err) {
            await createComponent(dest,fileUrl,depsUrl,component);

            process.exit(1)
        }

        const answer = await inquirer.prompt([
            {
                type: "list",
                name: "option",
                message:
                    "There is a file with this name in the uiKit folder, do you want to overwrite this?",
                choices: [
                    { name: "Yes", value: "Yes" },
                    { name: "No", value: "No" },
                ],
            },
        ]);

        if (answer.option === "Yes") {
            createComponent(dest,fileUrl,depsUrl,component);
        } else {
            console.log("❌ Operation cancelled by the user");
            process.exit(1)
        }
    });
}

async function getDesiredComponent() {
    const answer = await inquirer.prompt([
        {
            type: "list",
            name: "option",
            message:
                "Which component do you want to install?",
            choices: availableComponents
        },
    ]);

    return answer.option
}

async function createComponent(dest, fileUrl, depsUrl, component) {
    const packageJsonPath = path.join(process.cwd(), "package.json");

    try {
        execSync(`curl --create-dirs > ${dest} ${fileUrl}`);
        console.log(`✅ ${component} was added to your project!`);
        console.log(`🛜 Fetching dependencies...`);

        const depsFetch = await new Promise((resolve, reject) =>{
            https.get(depsUrl, (res) =>{
                let data = ''

                res.on('data', (chunck) =>{
                    data += chunck
                })

                res.on('end', () =>{
                    try {
                        resolve(JSON.parse(data))
                    } catch (error) {
                        reject("❌ Failed to parse dependencies: " + error);
                    }
                })

                res.on('error', (error) =>{
                    reject("❌ Failed to parse dependencies: " + error);
                })
            })
        })

        if(depsFetch && depsFetch.dependencies){
            console.log("📦 Checking dependencies...");

            const depsList = Object.entries(depsFetch.dependencies).map(([pkg, version]) => `${pkg}@${version}`)

            const packageJsonData = fs.readFileSync(packageJsonPath, 'utf-8')
            const packagejson = JSON.parse(packageJsonData)
            const installed = packagejson.dependencies || {}

            const toInstall = depsList.filter((dep) =>{
                const depName = dep.split('@')[0];
                
                if(!installed[depName]){
                    return true
                }else{
                    const required = dep.replace(/[^0-9.]/g, "");
                    const installedPkg = installed[depName].replace(/[^0-9.]/g, "");
                    const greater = isVersionGreaterOrEqual(installedPkg, required)

                    return !greater
                }
            })

            
            if(toInstall.length > 0){
                console.log(`📦 Installing dependencies... (${toInstall.join(", ")})`);
                execSync(`npm install -P ${toInstall.join(" ")}`);
            }
        }

        // https.get(depsUrl, (res) => {
        //     let data = "";

        //     res.on("data", (chunck) => {
        //         data += chunck;
        //         console.log(JSON.parse(chunck))
        //     });

        //     res.on("end", () => {
        //         try {
        //             const dependencies = JSON.parse(data);
        //             if (dependencies.dependencies) {
        //                 console.log("📦 Checking dependencies...");

        //                 const depsList = Object.entries(
        //                     dependencies.dependencies
        //                 ).map(([pkg, version]) => `${pkg}@${version}`);

        //                 fs.readFile(
        //                     packageJsonPath,
        //                     "utf-8",
        //                     (err, data) => {
        //                         if (err) {
        //                             console.log("error", err);

        //                             return;
        //                         }
        //                         const packagejson = JSON.parse(data);
        //                         const installed = packagejson.dependencies; // trocar para dependencies

        //                         if (installed) {
        //                             const toInstall = depsList.filter(
        //                                 (dep) => {
        //                                     const depName =
        //                                         dep.split("@")[0];

        //                                     if (!installed[depName]) {
        //                                         return true;
        //                                     } else {
        //                                         const required =
        //                                             dep.replace(
        //                                                 /[^0-9.]/g,
        //                                                 ""
        //                                             );
        //                                         const installedPkg =
        //                                             installed[
        //                                                 depName
        //                                             ].replace(
        //                                                 /[^0-9.]/g,
        //                                                 ""
        //                                             );
        //                                         const isValid =
        //                                             isVersionGreaterOrEqual(
        //                                                 installedPkg,
        //                                                 required
        //                                             );
        //                                         return !isValid;
        //                                     }
        //                                 }
        //                             );

        //                             if (toInstall.length > 0) {
        //                                 const InstallPkg =
        //                                     toInstall.join(" ");
        //                                 console.log(
        //                                     `📦 Installing dependencies... (${toInstall.join(
        //                                         ", "
        //                                     )})`
        //                                 );
        //                                 execSync(
        //                                     `npm install -P ${InstallPkg} `
        //                                 );
        //                             }
        //                         } else {
        //                             console.log(
        //                                 `📦 Installing dependencies... (${depsList.join(
        //                                     ", "
        //                                 )})`
        //                             );
        //                             const InstallPkg = depsList.join(" ");
        //                             execSync(
        //                                 `npm install -P ${InstallPkg}`
        //                             );
        //                         }
        //                     }
        //                 );
        //             }
        //         } catch (error) {
        //             console.error(
        //                 "❌ Failled to parse dependencies:",
        //                 error
        //             );
        //         }
        //     }).on("error", (error) => {
        //         console.error("❌ Failled to parse dependencies:", error);
        //     });

            
        // });
    } catch (error) {
        console.error("❌ Failed to fetch component:", error);
    }
}

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// rl.question("Which component do you want? ", (component) => {

//     // if (
//     //     !availableComponents.some((comp) => {
//     //         return comp.toLowerCase() === component.toLowerCase();
//     //     })
//     // ) {
//     //     console.log("This component is not available or not exists!");
//     //     rl.close();
//     //     return;
//     // }

//     const repoUrl =
//         "https://raw.githubusercontent.com/filipeoliveira-oss/uiKit/refs/heads/main/src/components";
//     const fileUrl = `${repoUrl}/${component}/${component}.tsx`;
//     const depsUrl = `${repoUrl}/${component}/${component}.deps.json`;
//     const dest = `./src/components/uiKit/${component}.tsx`;

//     const packageJsonPath = path.join(process.cwd(), "package.json");
//     const tailwindVersion = execSync("npm show tailwindcss version").toString();

//     if (!tailwindVersion) {
//         console.log(
//             `Tailwind is required for this library to work, please refer to Tailwind's docs: https://tailwindcss.com/docs/installation`
//         );

//         rl.close();
//         return;
//     }

//     if (Number(tailwindVersion.split(".")[0]) < 4) {
//         console.log(
//             `Tailwind version is too old, please refer to Tailwind's migration website: https://tailwindcss.com/docs/upgrade-guide`
//         );

//         rl.close();
//         return;
//     }

//     fs.readFile(dest, "utf-8", async (err, data) => {
//         if (err) {
//             createComponent();

//             return;
//         }

//         const answer = await inquirer.prompt([
//             {
//                 type: "list",
//                 name: "option",
//                 message:
//                     "There is a file with this name in the uiKit folder, do you want to overwrite this?",
//                 choices: [
//                     { name: "Yes", value: "Yes" },
//                     { name: "No", value: "No" },
//                 ],
//             },
//         ]);

//         if (answer.option === "Yes") {
//             createComponent();
//         } else {
//             console.log("❌ Operation cancelled by the user");
//             rl.close();
//             return;
//         }
//     });

//     rl.close();
// });

function isVersionGreaterOrEqual(installed, required) {
    const [installedMajor, installedMinor, installedPatch] = installed
        .split(".")
        .map(Number);
    const [requiredMajor, requiredMinor, requiredPatch] = required
        .split(".")
        .map(Number);

    if (installedMajor > requiredMajor) return true;
    if (installedMajor < requiredMajor) return false;

    if (installedMinor > requiredMinor) return true;
    if (installedMinor < requiredMinor) return false;

    return installedPatch >= requiredPatch;
}

main()