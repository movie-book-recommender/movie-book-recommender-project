# General issues and their (possible) causes

## "This works fine on my computer but not on cPouta"

The production version is run with serve, not ```npm start```. There are some minor differences so try to run 

```npm ci --only=production --legacy-peer-deps ```

```npm run build```

```npm install -g serve```

``` serve -s -l tcp://0.0.0.0:5000 build ```

to match the production version. 

Then troubleshoot and alter the program if the program is not working as designed using serve.