

//@desc  Get all Pastes
//@route GET /Pastes
//@access public
// const getPastes = (req, res) => {
//     res.status(200).json("All Pastes")
// }

//@desc  create Paste
//@route POST /Pastes
//@access public
const createPaste = (req, res) => {
    res.status(201).json("Create contact")
}

//@desc  Get Paste
//@route GET /Pastes/:id
//@access public
const getPaste = (req, res) => {
    res.status(200).json(`Get single Paste for id ${req.params.id}`)
}

//@desc  Update Paste
//@route PUT /Pastes/:id
//@access public
const updatePaste = (req, res) => {
    res.status(201).json(`Update Pastes ${req.params.id}`)
}

//@desc  delete Paste
//@route DELETE /Pastes/:id
//@access public
const deletePaste = (req, res) => {
    res.status(200).json(`Delete Pastes ${req.params.id}`)
}

module.exports = {createPaste, getPaste, updatePaste, deletePaste}