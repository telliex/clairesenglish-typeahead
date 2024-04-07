const express = require('express');
const cros = require('cors');
const app = express();
const port = 3000;
app.use(cros());

// U.S. states array
const states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];


app.get('/api/states', (req, res) => {
    const search = (req.query.search || '').trim().toLowerCase();
    const filterStates = states.filter(state => state.toLowerCase().includes(search)).sort().slice(0,8);
    res.json(filterStates);
});
app.listen(port, () => {
    console.log(`Server running on  http://localhost:${port}`);
});