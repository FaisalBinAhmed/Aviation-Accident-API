# file: xml_parse.py
# author: Cedric Wille cwille97@bu.edu
# description: a program to parse a bunch of XML data and split it up
# date: 7/15/20

# data we are parsing is a big XML download from: https://www.ntsb.gov/investigations/AccidentReports/_layouts/ntsb.aviation/Index.aspx

import json

def json_format(input):
    '''A helper function to convert the XML pairs to JSON key value pairs'''

    ret = ''
    splitVals = input.split('"') 
    counter = 1 # counter to keep track of whether we are on the key or value part of the kv pair
    for val in splitVals:
        if (counter % 2 == 0): # even count so it is a value part of the key value pair
            val = '"' + val + '"'
            if val != splitVals[-2]: # we don't want to add a comma to the last value
                val += ', '
            ret += val
        else: # odd count so it is the key part which means we need to add quotes and a colon
            if val != '':
                val = val.replace(' ', '', 1) # remove space at front
                val = val.replace('=', '')
                val = '"' + val + '":'
            ret += val
        counter += 1
    ret = ret[:-5]
    return ret


def parse_initial_data(original, results): 
    '''This function is designed to take the original XML file as downloaded from the NTSB website and parse it into JSON'''
    xml_data = open(original, "r")
    results = open(results, "w")
    results.write('{ "items": [')
    for line in xml_data:
        rows = line.split("<ROW")
        del rows[0] # trim unecessary metadata
        del rows[0] # trim again
        for row in rows:
            row = row.replace('/>', '') # remote tags
            row = row.replace('\\', '/') # replace backslahes with a forward slash because backslash is a Python escape character
            newStr = "{ " + json_format(row) + " }, " # add brackets for this piece of data and call our helper function
            newStr = newStr.replace('"":', '')
            results.write(newStr)

    xml_data.close()
    results.write("] }")
    results.close()
    print("finished converting the XML data to JSON")

# parse_initial_data('AviationData.xml', 'xml_results.json')

def check_json(filename):
    '''Function to check if this is valid JSON by printing the JSON values corresponding to the string'''
    json_data = open(filename, 'r')
    for line in json_data:
        data = json.loads(line)
        print(data)

# check_json('xml_results.json')

