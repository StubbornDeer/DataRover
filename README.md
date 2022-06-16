# DataRover
## A friendly no-code data manager (for your grandma too)

 
 
## Installation
### Python server

1. In the terminal, or command prompt, move to the *server* folder.
2. Run the following command: 

    ```
    python -m venv venv
    ```

3. When the installation finished, when use with VS Code, click *View -> Command Palette -> Python: Select Interpreter*. 
    
    In the prompt input, enter: 

    ```
    .\server\venv\Scripts\python.exe
    ```

4. Activate the virtual environment.
    
    For Windows, run:

    ```
    venv\Scripts\activate.bat
    ```

    For Mac/Linix, run:

    ```
    source venv/bin/activate
    ```

5. Install Python packages (currently, Python 3.8 is supported)
    
    Run the command:

    ```
    pip install -r server/requirements.txt
    ```

6. In the root folder, create a file called *.env* name. Add the following content to it:

    ```FLASK_APP=server.application```
7. If you use VS Code, create a launch.json as described here https://code.visualstudio.com/docs/python/tutorial-flask#_run-the-app-in-the-debugger

    When prompted to enter the python file name, change *app.py* to *application.py*.

### Front-end
In another terminal, run the following command to install the NPM packages: 

```
npm install
```

## Running
1. In one terminal, move to *server* folder and run the command:

    ```
    flask run
    ```
    
    or, if you use VS Code click *Run -> Start Debugging*.
2. In another terminal (for example, windows prompt), move to *webapp* folder and run the following command:

    ```
    npm run dev
    ```
    This commain will run the webpack server with hot reloading. To compile the production code, please run the following command:

    ```
    npm run prod
    ```
3. In your favorite browser, navigate to http://127.0.0.1:5000/ 