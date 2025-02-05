#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import readline from "readline";
import https from "https";


// verificar se ja existe a funcao de merge tailwindCss

const availableComponents = ['modal', 'drawer']

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Which component do you want? ", (component) => {

    if(!availableComponents.some((comp) =>{
        return comp.toLowerCase() === component.toLowerCase()
    })){
        console.log('This component is not available or not exists!')
        rl.close()
        return
    }

    const repoUrl =
        "https://raw.githubusercontent.com/filipeoliveira-oss/uiKit/refs/heads/main/src/components";
    const fileUrl = `${repoUrl}/${component}/${component}.tsx`;
    const depsUrl = `${repoUrl}/${component}/${component}.deps.json`;
    const dest = `./src/components/uiKit/${component}.tsx`;

    const packageJsonPath = path.join(process.cwd(), "package.json");
    const tailwindVersion = execSync("npm show tailwindcss version").toString();

    if(!tailwindVersion){
        console.log(`Tailwind is required for this library to work, please refer to Tailwind's docs: https://tailwindcss.com/docs/installation`)

        rl.close()
        return
    }

    if (Number(tailwindVersion.split(".")[0]) < 4) {
        console.log(
            `Tailwind version is too old, please refer to Tailwind's migration website: https://tailwindcss.com/docs/upgrade-guide`
        );

        rl.close();
        return;
    }


    try {
        execSync(`curl --create-dirs -o ${dest} ${fileUrl}`);
        console.log(`✅ ${component} was added to your project!`);
        console.log(`🛜 Fetching dependencies...`);

        https.get(depsUrl, (res) => {
            let data = "";

            res.on("data", (chunck) => {
                data += chunck;
            });

            res.on("end", () => {
                try {
                    const dependencies = JSON.parse(data);
                    if (dependencies.dependencies) {
                        console.log("📦 Checking dependencies...");

                        const depsList = Object.entries(
                            dependencies.dependencies
                        ).map(([pkg, version]) => `${pkg}@${version}`);

                        fs.readFile(packageJsonPath, "utf-8", (err, data) => {
                            if (err) {
                                console.log("error", err);

                                return;
                            }
                            const packagejson = JSON.parse(data);
                            const installed = packagejson.dependencies // trocar para dependencies
                            
                           if(installed){
                                
                               const toInstall = depsList.filter((dep) => {
                                   const depName = dep.split('@')[0];
   
                                   if(!installed[depName]){
                                    
                                       return true
                                   }else{
                                       const required = dep.replace(/[^0-9.]/g, '');
                                       const installedPkg = installed[depName].replace(/[^0-9.]/g, '')
                                       const isValid = isVersionGreaterOrEqual(installedPkg, required)
                                       return !isValid
                                   }
                               })

                               if(toInstall.length > 0){
                                   const InstallPkg = toInstall.join(' ')
                                    console.log(`📦 Installing dependencies... (${toInstall.join(', ')})`);
                                    execSync(`npm install -S ${InstallPkg} `)

                               }
                           }else{
                                console.log(`📦 Installing dependencies... (${depsList.join(', ')})`);
                                const InstallPkg = depsList.join(' ')
                                execSync(`npm install -S ${InstallPkg}`)
                           }
                        });
                    }
                } catch (error) {
                    console.log("❌ Failled to parse dependencies:", error);
                }
            }).on("error", (error) => {
                console.log("❌ Failled to parse dependencies:", error);
            });
        });
    } catch (error) {
        console.error("❌ Failed to fetch component:", error);
    }

    rl.close();
});

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
