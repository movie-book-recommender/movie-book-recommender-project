# Dependency workflow to minimize conflicts

1. Check the node version with 
```
node -v
```
Make sure it is 18 or higher, if not, update it

2. After every pull, run
```
npm install
```
in frontend folder

If there is some conflicts with legacy peer dependencies or similiar, run it with flag --legacy-peer-deps:
```
npm install --legacy-peer-deps
```
The conflicts probably are caused by older version of node in some developer computer and thus causes new dependencies to be dependent on older versions of node.