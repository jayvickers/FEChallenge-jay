# Notes and Considerations

I wanted to use this readme to discuss some things that may not be totally evident by running the code.

## Design and Styling Philosophy
- This is the first project that I've made using IBM Carbon, but I thought it was a good opporunity to familiarize myself with this library and also display that I am confident using multiple shared component libraries and that I can read documentation and quickly learn and implement new frameworks.
- All components except for the landing page are built using Carbon shared components with added functionality to achieve the project requests.
- Typically I employ BEM(http://getbem.com/) class naming format using multiple stylesheets and a postprocessor like LESS or SCSS, however since much of the styling is handled by Carbon there is only a single SCSS file used to handle some specific styles. 

## Layout and Navigation
- There are two routes accessible in this app: landing and data-table.
- Access the routes through the navigation icon in the top right corner of the header.
- Routing is achieved using React Router, this is a very simple implementation and the landing page is really just there to show that I can use React Router and that I have experience using it in the past.

## Usage
- startup scripts are unchanged, `npm i` followed by `npm run start`

## Next Steps
I did try to respect the time limit of this project, as such I limited my dev time to the recommended 6 hour range. However I thought that I would list things here that I would implement into this solution if the time range were longer.
- Implement filtering and sorting beyond the current page. All requested functionality such as deletion and updating are fully present and implemented. 
  - Currently filtering and sorting only work on the current page, I would expand this by writing custom handlers that would query my datastore on input change. The Search and Sorting Carbon table components both support these types of extensions. 
- Add more routes and further navigation
  - I didn't see a lot of opportunity to add many routes to this project, but I would possibly add a 404 route.
- More extensive testing.
  - I used React Testing Library for this project to help me quickly test helper functions, but given more time I would add complex render tests.
- More mobile support.
  - I'm not aware of how supported mobile views are with the projects that this team works on, however given more time I would add some custom media queries to help things look cleaner on smaller screen sizes.
  


**Thanks again for your consideration!** 

