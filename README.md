# Aviation Accident API

The data used by this API is public information obtained from the [NTSB Website](https://www.ntsb.gov/investigations/AccidentReports/_layouts/ntsb.aviation/Index.aspx) where it was downloaded as an XML file. Note that the NTSB maintains this dataset and some pieces of data are missing or withheld. I then wrote a custom Python script to automate the conversion of this data to JSON format. I had to manually delete a few characters at the beginning and end of the file. I was then able to import the JSON file into MongoDB using the command: `mongoimport -v -d ntsb -c data xml_results.json --batchSize 1 --jsonArray`

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
`http://localhost:5000/`
Renders the information page
### /random
`http://localhost:5000/random`
Returns a random Report
### /registration/:regNum
`http://localhost:5000/registration/N739PA` Returns all Reports corresponding to this Registration Number
### /eventid/:eid
`http://localhost:5000/eventid/20001213X27403`
Returns the Report corresponding to this EventId
### /accidentnumber/:anum
`http://localhost:5000/accidentnumber/DCA89RA014`
Returns the Report corresponding to this AccidentNumber
