import observ from 'observ'

var toArray = Array.prototype.slice.apply.bind(Array.prototype.slice)

export default function() {
    var o = observ()

    return {
        observable: o,
        handler: function triggerSelect(event) {
            var selection = window.getSelection()

            if (selection.isCollapsed) return
            if (selection.anchorNode.nodeName !== '#text') return
            if (selection.focusNode.nodeName !== '#text') return

            o.set(getSelectedPosition(event.currentTarget, selection))
        }
    }
}

function toLength(node) {
    if (node.nodeName === '#text')
        return node.length

    if (node.nodeName === 'BR')
        return 1

    return 0
}

function filterPrevNode(selfNode, resultArray, node, index) {
    if (resultArray.isSelfNodeFound)
        return resultArray

    // Traverse children.
    if (node.childNodes.length > 0) {
        var children = toArray(node.childNodes)
        resultArray = children.reduce(
            (prev, current, i) => filterPrevNode(selfNode, prev, current, i),
            resultArray
        )
    }

    if (node === selfNode)
        resultArray.isSelfNodeFound = true

    if (!resultArray.isSelfNodeFound) {
        resultArray.push(node)
    }

    return resultArray
}

function getPrevNodesOffset(target, node) {
    var brotherNodes = toArray(target.childNodes),
        pos = brotherNodes
        .reduce((prevValue, currentValue, i) => filterPrevNode(node, prevValue, currentValue, i), [])
        .reduce((pos, n) => {
            console.log(n, toLength(n));
            return pos += toLength(n)
        }, 0)

    return pos
}

function getPosition(target, selection, name) {
    return getPrevNodesOffset(target, selection[name + 'Node']) +
        selection[name + 'Offset']
}

function toBeginEnd(apos, fpos) {
    return {
        begin: apos < fpos ? apos : fpos,
        end: apos < fpos ? fpos : apos
    }
}

function getSelectedPosition(target, selection) {
    var apos = getPosition(target, selection, 'anchor'),
        fpos = getPosition(target, selection, 'focus')

    return toBeginEnd(apos, fpos)
}
