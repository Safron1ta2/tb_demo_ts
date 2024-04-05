# Auto-tests execution

  Example command to run tests:
        
        npm test

- If you want to run tests with custom url, user or browser use:

        BASE_URL=your_base_url EMAIL=your_email PASSWORD=your_password BROWSER=firefox npm test


  Run tests in docker container:
1) Build image from [tb_demo_ts](.):

       docker build -t my-playwright-tests .

2) Run docker container:
    
       docker run my-playwright-tests
