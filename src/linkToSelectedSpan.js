import observ from 'observ'
import pathJoin from './pathJoin'

main()

function toLength(node) {
    return node.nodeName === "#text" ? node.length :
        node.nodeName === "BR" ? 1 :
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

function toSelectString(select) {
    return select.begin + '-' + select.end
}

function triggerSelect(observ, event) {
    var selection = window.getSelection()

    if (selection.isCollapsed) return
    if (selection.anchorNode.nodeName !== '#text') return
    if (selection.focusNode.nodeName !== '#text') return

    observ.set(toSelectString(getSelectedPosition(selection)))
}

function createLinkSpaceContent($target) {
    var template = `
        <span class="range"></span>
        <a class="link"></a>
    `

    return $target.append(template)
}

function updateLinkSpaceContent($target, select, url) {
    var template = `<span class="range">${select}</span><a class="link" href="${url}">&lt${url}&gt</a>`

    $target[0].innerHTML = template
}

function selected($linkSpace, select) {
    var url = pathJoin(location.href, 'spans/' + select)
    updateLinkSpaceContent($linkSpace, select, url)
}

function bindEvent($target, $linkSpace) {
    var select = observ('');

    $target
        .on('click', (event) => triggerSelect(select, event))

    select((select) => selected($linkSpace, select))
}

function linkToSelectedSpan(selector) {
    var $linkSpace = jQuery(selector)
    if ($linkSpace.length === 0) {
        console.warn('no element is found. selector: ', selector)
        return
    }

    createLinkSpaceContent($linkSpace)
    bindEvent(this, $linkSpace)

    console.log('start to observe element.')
    return this
}

function main() {
    jQuery.fn.linkToSelectedSpan = linkToSelectedSpan
}
