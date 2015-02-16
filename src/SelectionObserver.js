import observ from 'observ'

export default function() {
    var o = observ()

    return {
        observable: o,
        handler: function triggerSelect(event) {
            var selection = window.getSelection()

            if (selection.isCollapsed) return
            if (selection.anchorNode.nodeName !== '#text') return
            if (selection.focusNode.nodeName !== '#text') return

            o.set(getSelectedPosition(selection))
        }
    }
}

function toLength(node) {
    return node.nodeName === '#text' ? node.length :
        node.nodeName === 'BR' ? 1 :
        node.nodeName === 'SPAN' ? node.innerHTML.length :
        0
}

function filterPrevNode(selfNode, resultArray, node, index) {
    if (node === selfNode)
        resultArray.isSelfNodeFound = true

    if (!resultArray.isSelfNodeFound)
        resultArray.push(node)

    return resultArray
}

function getPrevNodesOffset(node) {
    var brotherNodes = Array.prototype.slice.apply(node.parentElement.childNodes),
        pos = brotherNodes
        .reduce((prevValue, currentValue, i) => filterPrevNode(node, prevValue, currentValue, i), [])
        .reduce((pos, n) => pos += toLength(n), 0)

    return pos
}

function getPosition(selection, name) {
    return getPrevNodesOffset(selection[name + 'Node']) +
        selection[name + 'Offset']
}

function toBeginEnd(apos, fpos) {
    return {
        begin: apos < fpos ? apos : fpos,
        end: apos < fpos ? fpos : apos
    }
}

function getSelectedPosition(selection) {
    var apos = getPosition(selection, 'anchor'),
        fpos = getPosition(selection, 'focus')

    return toBeginEnd(apos, fpos)
}
