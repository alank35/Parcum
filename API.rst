==================================
Parcum API Specification
==================================

This documents is an API Specification for Parcum.

There are two set of APIs based on the roles of users that
access the Parcum service.

* Administator role

  The Rest Path prefix: /v0/admin/

* App user role

  The Rest Path prefix: /v0/app/

Authentication
==============

The APIs must be made accessable through OAuth
(For now we can live with simple username password)

Admistrator Role API Specification
==================================

Below are the APIs for Interacting with Parcum as an Adminstrator


1. Add a new Parking/Garage location

\

   **POST        /v0/admin/garage**

\

    Json Request:

.. code-block:: python

    {
        "garage": {
            "name": "ABC",
            "type": "Indoor",
		    "ownership": "PRIVATE",
	    	"address_1": "stree 23",
	   		"address_2": "19640 solna",
	   	 	"country": "sweden",
	    	"latitude": 48.000000,
	    	"longitude": 94.590000,
	    	"altitude": 2,
	    	"slots_available": 300,
	   		"rates":
                [
	    			{
						"starttime": 0000,
                        "endtime": 1200,
                        "rate_type": "PER_HOUR",
                        "rate": 30
                        "currency": "SEK"
			        },
	    			{
						"starttime": 1200,
                        "endtime": 2359,
                        "rate_type": "PER_HOUR",
                        "rate": 40
                        "currency": "SEK"
					},
	    			{
					    "starttime": 0000,
                        "endtime": 2359,
                        "rate_type": "PER_DAY",
                        "rate": 350
                        "currency": "SEK"
					}
	            ]
        }
    }

\

    Json Response:

.. code-block:: python

    {
        "garage": {
            "id": "42",
            "name": "ABC",
        }
    }

2. List Garage/Parking details

\

    **GET        /v0/admin/garage/{garage_id}**

\

    Json Response:

.. code-block:: python

    {
        "garage": {
            "name": "ABC",
            "type": "Indoor",
		    "ownership": "PRIVATE",
	    	"address_1": "stree 23",
	   		"address_2": "19640 solna",
	   	 	"country": "sweden",
	    	"latitude": 48.000000,
	    	"longitude": 94.590000,
	    	"altitude": 2,
	    	"slots_available": 300,
	   		"rates":
                [
	    			{
						"starttime": 0000,
                        "endtime": 1200,
                        "rate_type": "PER_HOUR",
                        "rate": 30
                        "currency": "SEK"
			        },
	    			{
						"starttime": 1200,
                        "endtime": 2359,
                        "rate_type": "PER_HOUR",
                        "rate": 40
                        "currency": "SEK"
					},
	    			{
					    "starttime": 0000,
                        "endtime": 2359,
                        "rate_type": "PER_DAY",
                        "rate": 350
                        "currency": "SEK"
					}
	            ]
        }
    }


3. Delete Garage/Parking

\

    **DELETE        /v0/admin/garage/{garage_id}**

\

APP User Role API Specification
==================================

1. API to store user preferences


\

   **POST        /v0/app/{user-id}/preferences**
   **PUT        /v0/app/{user-id}/preferences**

\

    Json Request:

.. code-block:: python

    {
        "preferences": {
            "parking_type": "INDOOR",
            "parking_ownership": "ALL",
            "price_low": 10,
            "price_high": 50,
            "currency": "SEK"
            "vehical_type": "car_sedan"
        }
    }


2. Get app user preferences

\

   **POST        /v0/app/{user-id}/preferences**
\

    Json Response:

.. code-block:: python

    {
        "preferences": {
            "parking_type": "INDOOR",
            "parking_ownership": "ALL",
            "price_low": 10,
            "price_high": 50,
            "currency": "SEK"
            "vehical_type": "car_sedan"
        }
    }

3. Search for Garage/Parking

\

   **GET        /v0/app/{user-id}/garage**

\

    Json Request:

.. code-block:: python

    {
        "search": {
	        "latitude": 48.000020,
	        "longitude": 94.591000,
            "current_time": 1845,
            "location": "SE",
            "search_radius": 1500,
            "max_results": 100
        }
    }

\

    Json Response:

.. code-block:: python

    {
        "garages":
        [
            {
            "name": "ABC",
            "type": "Indoor",
		    "ownership": "PRIVATE",
	    	"address_1": "stree 23",
	   		"address_2": "19640 solna",
	   	 	"country": "sweden",
	    	"latitude": 48.000000,
	    	"longitude": 94.590000,
	    	"altitude": 2,
	    	"slots_available": 300,
	   		"rates":
                [
	    			{
						"starttime": 1200,
                        "endtime": 2359,
                        "rate_type": "PER_HOUR",
                        "rate": 40
                        "currency": "SEK"
					},
	    			{
					    "starttime": 0000,
                        "endtime": 2359,
                        "rate_type": "PER_DAY",
                        "rate": 350
                        "currency": "SEK"
					}
	            ]
            },
            {
            "name": "ZXY",
            "type": "OUTDOOR",
		    "ownership": "PUBLIC",
	    	"address_1": "stree 34",
	   		"address_2": "19640 solna",
	   	 	"country": "sweden",
	    	"latitude": 48.002000,
	    	"longitude": 94.590900,
	    	"altitude": 10,
	    	"slots_available": 30,
	   		"rates":
                [
	    			{
						"starttime": 1200,
                        "endtime": 2359,
                        "rate_type": "PER_HOUR",
                        "rate": 15
                        "currency": "SEK"
					}
	            ]
            },
            {
            "name": "MNO",
            "type": "INDOOR",
		    "ownership": "PRIVATE",
	    	"address_1": "stree 31",
	   		"address_2": "19640 solna",
	   	 	"country": "sweden",
	    	"latitude": 48.004000,
	    	"longitude": 94.590600,
	    	"altitude": 10,
	    	"slots_available": 200,
	   		"rates":
                [
	    			{
						"starttime": 1200,
                        "endtime": 2359,
                        "rate_type": "PER_HOUR",
                        "rate": 45
                        "currency": "SEK"
					}
	            ]
            }
        ]
    }
