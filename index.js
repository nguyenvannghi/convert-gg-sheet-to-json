const path = require('path');
const fs = require('fs');
const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('./key.json');

const doc = new GoogleSpreadsheet('1HOFI0ldw2TSkllzScZPVR5XsPI3BxoRZDwVkkET-HBE');

const myArgs = process.argv.slice(2);

if (myArgs.length === 0) {
    console.log('🚀  Missing column name in the process: yarn start [parameter(1)] [parameter(2)] [parameter(n+)]');
    return;
}

doc.useServiceAccountAuth(creds, function(err) {
    doc.getRows(1, function(err, rows) {
        if (err) {
            console.log(err);
        } else {
            let json = {};
            myArgs.forEach(arg => (json = Object.assign(json, { [arg]: {} })));
            for (var i = 0; i < rows.length; i++) {
                const rowItems = rows[i];

                myArgs.forEach(arg => {
                    const cellIndex = Object.keys(rowItems).findIndex(t => t === arg);
                    const cell = Object.keys(rowItems)[cellIndex];
                    if (arg === cell) {
                        json[arg] = Object.assign(json[arg], { [rows[i].key]: rows[i][arg] });
                    }
                });
            }
            fs.writeFileSync(path.resolve(__dirname, './lang.json'), JSON.stringify(json));
            console.log('🚀  Generated sheet.json');
        }
    });
});
