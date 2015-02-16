import pathJoin from './pathJoin';

main();

function toLength(node) {
    return node.nodeName === "#text" ? node.length :
        node.nodeName === "BR" ? 1 :
        0;
}

function getPrevNodesOffset(node) {
    var pos = 0,
        brotherNodes = node.parentElement.childNodes;
    for (var i = 0; brotherNodes[i] !== node; i++) {
        pos += toLength(brotherNodes[i]);
    }
    return pos;
}

function getPosition(selection, name) {
    return getPrevNodesOffset(selection[name + 'Node']) +
        selection[name + 'Offset'];
}

function toBeginEnd(apos, fpos) {
    return {
        begin: apos < fpos ? apos : fpos,
        end: apos < fpos ? fpos : apos
    };
}

function getSelectedPosition(selection) {
    var apos = getPosition(selection, 'anchor'),
        fpos = getPosition(selection, 'focus');

    return toBeginEnd(apos, fpos);
}

function toSelectString(select) {
    return select.begin + '-' + select.end;
}

function triggerSelect(event) {
    var selection = window.getSelection();

    if (selection.isCollapsed) return;
    if (selection.anchorNode.nodeName !== '#text') return;
    if (selection.focusNode.nodeName !== '#text') return;

    jQuery(event.target)
        .trigger('select', toSelectString(getSelectedPosition(selection)));
}

function createLinkSpaceContent($target) {
    return $target
        .append(
            jQuery('<span>')
            .addClass('range')
        )
        .append(
            jQuery('<a>')
            .addClass('link')
        );
}

function updateLinkSpaceContent($target, select, url) {
    return $target.find('.range')
        .text(select)
        .end()
        .find('.link')
        .text('<' + url + '>')
        .attr('href', url);
}

function Selected($linkSpace) {
    return function(event, select) {
        var url = pathJoin(location.href, 'spans/' + select);
        updateLinkSpaceContent($linkSpace, select, url);
    };
}

function bindEvent($target, $linkSpace) {
    $target
        .on('click', triggerSelect)
        .on('select', new Selected($linkSpace));
}

function linkToSelectedSpan(selector) {
    var $linkSpace = jQuery(selector);
    if ($linkSpace.length === 0) {
        console.warn('no element is found. selector: ', selector);
        return;
    }

    createLinkSpaceContent($linkSpace);
    bindEvent(this, $linkSpace);

    console.log('start to observe element.');
    return this;
}

function main() {
    jQuery.fn.linkToSelectedSpan = linkToSelectedSpan;
}
