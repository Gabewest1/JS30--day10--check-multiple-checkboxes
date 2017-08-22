(function() {
    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    let locations = getCheckboxesLocations()
    let isShiftPressed = false
    let clickedCheckbox = false

    /* Setup Listeners */
    document.addEventListener("keydown", handleKeydown)
    checkboxes.addEventListener("click", handleCheckboxClick)

    function handleCheckboxClick(e) {
        clickedCheckbox = true
    }

    function selectCheckbox(checkbox) {
        console.dir(checkbox)
        checkbox.setAtribute("selected", true)
    }

    function getCheckboxesLocations() {
        let locations = []

        checkboxes.forEach(checkbox => locations.push({top: checkbox.clientTop, left: checkbox.clientLeft}))

        return locations
    }

    function handleKeydown(e) {
        console.log(e)

        if (e.shiftKey) isShiftPressed = true
    }

    function handleKeyup(e) {
        console.log(e)

        if (e.shiftKey) isShiftPressed = false
    }
})()
