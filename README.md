# convert-gg-sheet-to-json
Convert gg sheet to Json use [GoogleSpreadsheet.js](https://www.npmjs.com/package/google-spreadsheet)

**Command line:** ` yarn start sheetId=[GG_SHEET_ID] [parameter(1)] [parameter(2)] [parameter(n+)]`

**Example:** `yarn start sheetId=1HOFI0ldw2TSkllzScZPVR5XsPI3BxoRZDwVkkET-HBE valuevietnamese valueeng`

## Service Account:
This is a 2-legged oauth method and designed to be "an account that belongs to your application instead of to an individual end user". Use this for an app that needs to access a set of documents that you have full access to. [(read more)](https://developers.google.com/identity/protocols/OAuth2ServiceAccount)

### Setup Instructions

1. Go to the [Google Developers Console](https://console.developers.google.com/project)
2. Select your project or create a new one (and then select it)
3. Enable the Drive API for your project
- In the sidebar on the left, expand APIs & auth > APIs
- Search for "drive"
- Click on "Drive API"
- Click the blue "Enable API" button
4. Create a service account for your project
- In the sidebar on the left, expand APIs & auth > Credentials
- Click blue "Add credentials" button
- Select the "Service account" option
- Select "Finish a new private key" checkbox
- Select the "JSON" key type option
- Click blue "Create" button
5. Run `yarn start sheetId=[GG_SHEET_ID] [parameter(1)] [parameter(2)] [parameter(n+)]`
- [parameter]: column on gg sheet
- Your JSON key file is generated and downloaded to your machine (it is the only copy!)
- Note your service account's email address (also available in the JSON key file)
