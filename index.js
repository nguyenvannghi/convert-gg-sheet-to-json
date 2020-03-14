const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { afterString } = require('./helper');
const creds = require('./key.json');

let sheetId = '';
let parameters = [];
const myArgs = process.argv.slice(2);

const regex = /^(sheetId=)+(.+)$/;

if (myArgs.length === 0) {
    console.log('\n');
    console.log('\t 😨  Missing parameters in the process');
    console.log('\t 👉  yarn start sheetId=[GG_SHEET_ID] [parameter(1)] [parameter(2)] [parameter(n+)]');
    console.log('\t 🙏  Example: yarn start sheetId=1HOFI0ldw2TSkllzScZPVR5XsPI3BxoRZDwVkkET-HBE vi en-US');
    console.log('\n');
    return;
}

myArgs.forEach(item => {
    if (regex.test(item)) {
        sheetId = afterString(item, 'sheetId=');
    } else {
        parameters.push(item);
    }
});

if (sheetId === '') {
    console.log('\n');
    console.log('\t 😨  Missing sheetId in the process');
    console.log('\t 👉  yarn start sheetId=[GG_SHEET_ID] [parameter(1)] [parameter(2)] [parameter(n+)]');
    console.log('\t 🙏  Example: yarn start sheetId=1HOFI0ldw2TSkllzScZPVR5XsPI3BxoRZDwVkkET-HBE vi en-US');
    console.log('\n');
    return;
}

if (parameters.length === 0) {
    console.log('\n');
    console.log('\t 😨  Missing column gg sheet in the process');
    console.log('\t 👉  yarn start sheetId=[GG_SHEET_ID] [parameter(1)] [parameter(2)] [parameter(n+)]');
    console.log('\t 🙏  Example: yarn start sheetId=1HOFI0ldw2TSkllzScZPVR5XsPI3BxoRZDwVkkET-HBE vi en-US');
    console.log('\n');
    return;
}

const doc = new GoogleSpreadsheet(sheetId);
async function ggSheetFunc() {
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    return { title: sheet.title, rows };
}

ggSheetFunc().then(({ title, rows }) => {
    let json = {};
    parameters.forEach(arg => (json = Object.assign(json, { [arg]: {} })));

    for (var i = 0; i < rows.length; i++) {
        const rowItems = rows[i];
        parameters.forEach(arg => {
            const cellIndex = Object.keys(rowItems).findIndex(t => t.toLowerCase() === arg.toLowerCase());
            const cell = Object.keys(rowItems)[cellIndex];
            json[arg] = Object.assign(json[arg], {
                [rows[i].Key]: rows[i][cell] ? rows[i][cell] : '',
            });
        });
    }
    const dir = './converted/';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    fs.writeFileSync(path.resolve(__dirname, `./converted/${title}_${uuid.v4()}.json`), JSON.stringify(json));
    console.log('\n');
    console.log('\t 🚀  Generated sheet.json');
    console.log('\n');
});
