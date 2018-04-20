(function() {
    let checkboxes = Array.from(document.querySelectorAll("input[type='checkbox']"))
    let checkboxLocations = getCheckboxesLocations()
    let isShiftPressed = false
    let isAltPressed = false
    let isMouseDown = false
    let lastUncheckedBox = undefined
    let lastCheckedBox = undefined
    let lastClickedCheckbox = undefined

    /* Setup Listeners */
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("click", handleCheckboxClick)
    })
    document.addEventListener("keydown", handleKeydown)
    document.addEventListener("keyup", handleKeyup)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mousedown", handleCheckboxMouseDown)
    document.addEventListener("mouseout", handleCheckboxMouseOut)
    document.addEventListener("mousemove", handleMouseMove)

    function handleCheckboxClick(e) {
        let checkbox = e.currentTarget
        
        if (isShiftPressed && lastClickedCheckbox) {
            selectRangeOfCheckboxes(checkbox, lastClickedCheckbox)
        }

        lastClickedCheckbox = checkbox        
    }

    function selectRangeOfCheckboxes(checkbox1, checkbox2) {
        let cb1Index = checkboxes.indexOf(checkbox1)
        let cb2Index = checkboxes.indexOf(checkbox2)
        console.log("INDEXES", cb1Index, cb2Index)

        let checkboxesToSelect = checkboxes.filter((checkbox, index) =>
            (Math.min(cb1Index, cb2Index) < index) && (index < Math.max(cb1Index, cb2Index))
        )

        checkboxesToSelect.forEach(checkbox => 
            checkbox.checked ? unselectCheckbox(checkbox) : selectCheckbox(checkbox)
        )
    }

    function handleMouseMove(e) {
        if (isMouseDown && (isShiftPressed || isAltPressed)) {

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
        if (isMouseDown === true) {
            isMouseDown = false
        }
    }

    function handleCheckboxMouseDown(e) {
        isMouseDown = true
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
