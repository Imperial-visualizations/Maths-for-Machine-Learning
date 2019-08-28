Principal Component Analysis Visualisation Suite
================================================
  
Author: Aditya Goel  
Email: aditya.goel18@imperial.ac.uk  

The project directory is organised as follows:  

├── Fisher_iris.csv  
├── lenaPCA.png  
├── pca.html  
├── readme.md  
├── script  
│   ├── fisher-iris-dataset.js  
│   ├── general-utilities.js  
│   ├── jquery-csv.js  
│   ├── maths-utilities.js  
│   ├── numeric  
│   └── pca.js  
└── style
    ├── skeleton.css  
    └── style.css  
 
The Fischer_iris.csv data file is provided for reference, and is not necessary for the running of the suite.  

Within the pca.html file the html for the suite is available.  

Within the style folder the css for the suite is available. It is very minorly adapted from an old visualisations style folder.  

Within the script folder are the js files of interest:  
* fisher-iris-dataset.js contains the preloaded Fischer-Iris dataset used throughout the suite.  
* general-utilities.js contains functions to do with general suite visual behaviour like cleaning up divs, generating buttons, etc as well as a few global variables for parameter control with plotly graphs.  
* maths-utilities.js contains some of the matrix maths and statistics functions I've written for the purpose of this suite, as pca is actually done when the suite is launched. The main dependencies here are the math.js library linked via CDN and numeric.js library which is downloaded in the scripts folder.  
*  pca.js contains the main control code. The "switchTab" function directs to the relevant function for the relevant page depending on what page is requested. The major dependencies here are plotly, and the utilities files I've also put in the scripts folder.  

