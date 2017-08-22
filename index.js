(function() {
    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    let checkboxLocations = getCheckboxesLocations()
    let isShiftPressed = false
    let isAltPressed = false
    let clickedCheckbox = false
    let lastUncheckedBox = undefined
    let lastCheckedBox = undefined

    /* Setup Listeners */
    checkboxes.forEach(checkbox => checkbox.addEventListener("mousedown", handleCheckboxMouseDown))
    checkboxes.forEach(checkbox => checkbox.addEventListener("mouseout", handleCheckboxMouseOut))
    document.addEventListener("keydown", handleKeydown)
    document.addEventListener("keyup", handleKeyup)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mousemove", handleMouseMove)

    function handleMouseMove(e) {
        if (clickedCheckbox) {

            let [top, left] = [e.clientY, e.clientX]
            let indexOfHoveredCheckbox = findHoveredCheckbox(top, left)

            if (indexOfHoveredCheckbox >= 0) {
                let checkbox = checkboxes[indexOfHoveredCheckbox]
                console.log(checkbox.checked, isAltPressed)
                if (checkbox.checked && isAltPressed && checkbox !== lastCheckedBox) {
                    console.log("UNSELECTING:")
                    unselectCheckbox(checkbox)
                } else if (!checkbox.checked && checkbox !== lastUncheckedBox) {
                    selectCheckbox(checkbox)
                    lastUncheckedBox = undefined
                }
            }
        }
    }

    function findHoveredCheckbox(top, left) {
        let width = parseFloat(window.getComputedStyle(checkboxes[0]).getPropertyValue("width").replace("px", ""))
        let height =parseFloat( window.getComputedStyle(checkboxes[0]).getPropertyValue("height").replace("px", ""))
        
        return checkboxLocations.findIndex(checkbox => {

            if (checkbox.top <= top && checkbox.left <= left) {
                if (checkbox.top + height >= top && checkbox.left + width >= left) {
                    return true
                }
            }

            return false
        })
    }

    function handleMouseUp(e) {
        if (clickedCheckbox === true) {
            clickedCheckbox = false
        }
    }

    function handleCheckboxMouseDown(e) {
        clickedCheckbox = true
    }

    function handleCheckboxMouseOut(e) {
        lastCheckedBox = undefined
        lastUncheckedBox = undefined
    }

    function selectCheckbox(checkbox) {
        checkbox.checked =  true
        lastCheckedBox = checkbox
    }

    function unselectCheckbox(checkbox) {
        checkbox.checked =  false
        lastUncheckedBox = checkbox
    }

    function getCheckboxesLocations() {
        let locations = []

        checkboxes.forEach(checkbox => locations.push({top: checkbox.getBoundingClientRect().top, left: checkbox.getBoundingClientRect().left}))

        return locations
    }

    function handleKeydown(e) {
        if (e.shiftKey) isShiftPressed = true
        if (e.altKey) isAltPressed = true
    }

    function handleKeyup(e) {
        if (isShiftPressed) isShiftPressed = false
        if (isAltPressed) isAltPressed = false            
    }
})()
