# Aviation Accident API

The data used by this API is public information obtained from the [NTSB Website](https://www.ntsb.gov/investigations/AccidentReports/_layouts/ntsb.aviation/Index.aspx) where it was downloaded as an XML file. Note that the NTSB maintains this dataset and some pieces of data are missing or withheld. I then wrote a custom Python script to automate the conversion of this data to JSON format. I had to manually delete a few characters at the beginning and end of the file. I was then able to import the JSON file into MongoDB using the command: `mongoimport -v -d ntsb -c data xml_results.json --batchSize 1 --jsonArray`
[For questions and comments, or if you plan on heavily using this API please contact me via this Google Form and I'll try to get back to you ASAP.](https://docs.google.com/forms/d/e/1FAIpQLScpHdcjWVSzXQmOPy2T-lw-AIepDzjpZUvm7xr-VxxUknVtEQ/viewform?usp=sf_link) If usage and demand scales in the future I may need to implement API keys to handle the load and cover costs. This repository represents both the open source code, as well as documentation for the live API that I am currently hosting. I might shut down this publicly hosted API if it starts to incur costs to me. 

## Instructions to self-host the API
In the event that I shut down the live API, you can self host the API. First, download the data JSON zip file, OR download the XML file from the NTSB website and use my Python script to parse it into JSON and manually remove any errors that are left behind. Next, import the JSON to MongoDB and change the database conneciton in the code to connect to your database. Now the API should have access to the database containing all the data and then you can run it locally or host it somewhere.

## Definitions
* **Report**: a Report item from the database, can be an incident or an accident
* **Incident**:[Incident](https://www.law.cornell.edu/cfr/text/49/830.2) means an occurrence other than an accident, associated with the operation of an aircraft, which affects or could affect the safety of operations. 
* **Accident**: [Aircraft accident](https://www.law.cornell.edu/definitions/index.php?width=840&height=800&iframe=true&def_id=166d030bbdd1772f262ce755844a41ae&term_occur=999&term_src=Title:49:Subtitle:B:Chapter:VIII:Part:830:Subpart:A:830.2) means an occurrence associated with the operation of an aircraft which takes place between the time any person boards the aircraft with the intention of flight and all such persons have disembarked, and in which any person suffers death or serious injury, or in which the aircraft receives substantial damage. For purposes of this part, the definition of aircraft accident includes unmanned aircraft accident, as defined herein. 
* **EventId**: A unique ID for this Report
* **InvestigationType**: The type of investigation corresponding to this report
* **AccidentNumber**: A unique ID for an accident (this may be black of the InvestigationType is not an Accident
* **EventDate**: The date on which the event this report corresponds to occured on
* **Location**: The location where the event occured
* **Country**: The country in which the event occured
* **Latitude**: The latitude at which the event occured
* **Longitude**: The longitude at which the event occured
* **AirportCode**: The [IATA Airport Code](https://en.wikipedia.org/wiki/List_of_airports_by_IATA_airport_code:_A) corresponding to this event (events that didn't occur at an airport may ot have an AirportCode)
* **AirportName**: The name corresponding to the airport this event occured at
* **InjurySeverity**: A description of the injuries, may look like "Fatal(270)"
* **AircraftDamage**: Description of the damage, may look like "Destroyed"
* **AircraftCategory**: The category of this aircraft
* **Registration Number**: [An aircraft registration number](https://en.wikipedia.org/wiki/Aircraft_registration)
* **Make**: The manufacturer of the aircraft
* **Model**: The model of the aircraft
* **AmateurBuilt**: Yes or No, was the aircraft amateur built
* **NumberOfEngines**: The number of engines this aircraft has
* **EngineType**: The type of engines this aircraft has (Turbo Fan, Reciprocating, etc)
* **FarDescription**: A description of the Federal Aviation Regulation that this flight occured under (part 135 operation for example)
* **Schedule**: Yes or No was this a regularly scheduled flight
* **PurposeOfFlight**: What was the purpose of this flight
* **AirCarrier**: The airline who operated this flight
* **TotalFatalInjuries**: The number of fatal injuries 
* **TotalSeriousinjuries**: The number of serious injuries
* **TotalMinorInjuries**: The number of minor injuries
* **TotalUninjured**: The number of uninjured 
* **WeatherCondition**: The weather conditions at the time of this event
* **BroadphaseOfFlight**: What phase of flight was it (for example: cruise)
* **ReportStatus**: The status of the report this data was taken from (for example: preliminary, foreign, etc)
* **PublicationDate**: The date the report was published

## API Endpoints
**It should be noted that all data types returned in the JSON are strings because this is how the NTSB provided the data.**
### /
`http://aviation-accident-api.tech/`
Renders the information page
### /random
`http://aviation-accident-api.tech/random`
Returns a random Report
### /registration/:regNum
`http://aviation-accident-api.tech/registration/N739PA` Returns all Reports corresponding to this Registration Number
### /eventid/:eid
`http://aviation-accident-api.tech/eventid/20001213X27403`
Returns the Report corresponding to this EventId
### /accidentnumber/:anum
`http://aviation-accident-api.tech/accidentnumber/DCA89RA014`
Returns the Report corresponding to this AccidentNumber
### /date/:date/:qty?
`http://aviation-accident-api.tech/date/12-05-1990/5`
Returns the Reports corresponding to this date with an optional limit of 5, default limit is 1
### /country/:country/:qty?
`http://aviation-accident-api.tech/country/United%20States/5`
Returns the Reports corresponding to this country with an optional limit of 5, default limit is 1
### /latitude/:lat/:qty?
`http://aviation-accident-api.tech/latitude/20.2/5`
Returns the Reports corresponding to this latitude with an optional limit of 5, default limit is 1
### /longitude/:long/:qty?
`http://aviation-accident-api.tech/longitude/20.2/5`
Returns the Reports corresponding to this longitude with an optional limit of 5, default limit is 1
### /airportcode/:code/:qty?
`http://aviation-accident-api.tech/airportcode/KJFK/5`
Returns the Reports corresponding to this airport code with an optional limit of 5, default limit is 1
### /airportname/:name/:qty?
`http://aviation-accident-api.tech/airportname/FLAGLER%20COUNTY/5`
Returns the Reports corresponding to this airport name with an optional limit of 5, default limit is 1
### /make/:make/:qty?
`http://aviation-accident-api.tech/make/PIPER/5`
Returns the Reports corresponding to this aircraft make with an optional limit of 5, default limit is 1
### /model/:model/:qty?
`http://aviation-accident-api.tech/model/PA-28-161/5`
Returns the Reports corresponding to this aircraft model with an optional limit of 5, default limit is 1
### /numberofengines/:num/:qty?
`http://aviation-accident-api.tech/numberofengines/4/5`
Returns the Reports corresponding to aircraft with 4 engines with an optional limit of 5, default limit is 1
### /enginetype/:type/:qty?
`http://aviation-accident-api.tech/enginetype/TURBO%20FAN/5`
Returns the Reports corresponding to aircraft with Turbo Fan engines with an optional limit of 5, default limit is 1
### /fardescription/:far/:qty?
`http://aviation-accident-api.tech/fardescription/Part%2091:%20General%20Aviation/5`
Returns the Reports corresponding to aircraft operating under part 91 with an optional limit of 5, default limit is 1
### /schedule/:schedule/:qty?
`http://aviation-accident-api.tech/schedule/UNK/5`
Returns the Reports corresponding to aircraft where it was unknown if they were operating on a schedule, with an optional limit of 5, default limit is 1
### /aircarrier/:carrier/:qty?
`http://aviation-accident-api.tech/carrier/EAST%20COAST%20AIRWAYS,LTD/5`
Returns the Reports corresponding to aircraft operated by East Coast Airways, LTD; with an optional limit of 5, default limit is 1
### /totalfatalinjuries/:fatal/:qty?
`http://aviation-accident-api.tech/totalfatalinjuries/100/5`
Returns the Reports corresponding to Events with 100 fatal injuries with an optional limit of 5 results, default limit is 1
### /totalseriousinjuries/:serious/:qty?
`http://aviation-accident-api.tech/totalseriousinjuries/100/5`
Returns the Reports corresponding to Events with 100 serious injuries with an optional limit of 5 results, default limit is 1
### /totalminorinjuries/:minor/:qty?
`http://aviation-accident-api.tech/totalminorinjuries/100/5`
Returns the Reports corresponding to Events with 100 minor injuries with an optional limit of 5 results, default limit is 1
### /totaluninjured/:uninjured/:qty?
`http://aviation-accident-api.tech/totaluninjured/100/5`
Returns the Reports corresponding to Events with 100 uninjured with an optional limit of 5 results, default limit is 1
### /phaseofflight/:phase/:qty?
`http://aviation-accident-api.tech/phaseofflight/CRUISE/5`
Returns the Reports corresponding to Events occurring during the cruise phase of flight with an optional limit of 5 results, default limit is 1
### /publicationdate/:date/:qty?
`http://aviation-accident-api.tech/publicationdate/12-05-1990/5`
Returns the Reports published on 12/05/1990 with an optional limit of 5 results, default limit is 1
