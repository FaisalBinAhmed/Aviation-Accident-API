# Aviation Accident API

The data was obtained from the [NTSB Website](https://www.ntsb.gov/investigations/AccidentReports/_layouts/ntsb.aviation/Index.aspx) where it was downloaded as an XML file. I then write a custom Python script to automate the conversion of this data to JSON format. I had to manually delete a few characters at the beginning and end of the file. I was then able to import the JSON file into MongoDB using the command: `mongoimport -v -d ntsb -c data xml_results.json --batchSize 1 --jsonArray`

## API Endpoints
### /
`http://localhost:5000/`
Renders the information page
### /random
`http://localhost:5000/random`
Returns a random Report