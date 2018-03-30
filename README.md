# TrainScheduler
TrainScheduler


The objective of this project is to get the trian information. when the next train will arrive from now.


for this reason i have created a **app.js** file. It has firebase initializationa and listens for ***On child_added*** listener to get the data from firebase.

It also has also a firbase ***.push({}) *** function to save data.

#Moment.js

This section will get the current time and also get the data from firebase ***first time*** and will convert it to unix time and then with ***.diff(convertedtime, "minutes")*** it will calculate the difference between now and first time and then we get the remainder from the ***frequency*** is substructed and then will get when will be the next train coming.