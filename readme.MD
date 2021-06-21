# Metrics Alarm API

REST Api which stores and process metrics alert to detect non-desirable situations and get alerted.


# Introduction

In this README file you'll find enough information to Install, Run and test this application. 


## Prerequisites

* Node 14 : https://nodejs.org/es/download/
* Docker: https://docs.docker.com/install/
* Docker-compose: https://docs.docker.com/compose/install/

## Running the Application

* First we need to Clone this repository:

    > git clone https://github.com/Gonmontero/metrics-alarm-api.git

* Open Terminal and check docker is configured correctly and running:

    > docker -v

      Command should respond with:

      Docker version 20.10.7, build f0df350
      

 * Change your current directory to the location of the project and run:

    > docker-compose build

 * Last but not least, we have to tell Docker to start the image we have just built:

    > docker-compose up

    That should start the application and run it in the localhost Port 8080
    The expected result we are looking for is:

         metrics-alarm-api  | Server started on port 8080
         metrics-alarm-api  | MongoDB Connected


## API Documentation


Endpoint Name | Http Request | Description |
| --- | --- | --- |
Register Alert | POST http://localhost:8080/api/alert | This will register a new Alert given an "id", "side" and a encoded string of "data" in the Body Request. Refer to Swagger UI for more information. |
| Evaluate Metrics | POST http://localhost:8080/api/alert/{id}/metric | Process an Alert that has been registered, evaluates the metrics by comparing with the expected values and returns it's result. The Alert will notify during unmuted alert times if notifications had been registered to the alert. |

 ### Register Alert Example
 
  #### Request

    POST http://localhost:8080/api/alert

	{
		"name" : "paymentsTrasactions",
		"active": true,
		"expectedValues": [
			{
			"approvedPayments":
				{
					"value" : 0.8,
					"condition": ">="
				}
			}
		],
		"maxDelay": 10,
		"frecuence":"30",
		"notification": [
			{
				"type":"email",
				"data": {
					"recipient" : ["FakeEmail@test.com"]
				}
			}
		],
		"muteRange" : [
			{
				"from": "14:00:00",
				"to": "18:00:00"
			}
		]
	}

#### Response

    {
        "id": "60d05ca5ec7df70a803f7fb5",
        "name": "paymentsTrasactions"
    }


#### Explaining Metrics

 > "expectedValues" is an array of metrics where the alert can then analize and compare values, every metric should be written as
 { "metric_name" : { "value": numeric_value, "condition": "comparison_string_operator" } 
 Supported "comparison_string_operator" are "<", "<=", "!=", "=", ">=", ">".

    "expectedValues": [
			{
			"approvedPayments":
				{
					"value" : 0.8,
					"condition": ">="
				}
			}
	],

#### Frecuence
> Frecuence field establish a period of time that metrics should be posted  for evaluation, this field is followed by a MaxDelay. 
If the frecuence of metrics evaluation is ignored, a Job will detect that the metrics have not been evaluated and will send a notification 
unless its during Mute Time or during the max delay permitted

 ### Evaluate Metrics Example

    POST http://localhost:8080/api/alert/60d05ca5ec7df70a803f7fb5/metric

    {
    	"metrics":[
    		{
    			"name": "approvedPayments",
    			"value": 0.6
    		}
    	]
    }

#### Response

	{
	    "result": [
	        "The metric approvedPayments has not the expected value: >= 0.8 .Current value: 0.6"
	    ]
	}
