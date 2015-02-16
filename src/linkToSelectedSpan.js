import observ from 'observ'
import pathJoin from './pathJoin'
import SelectionObserver from './SelectionObserver'

main()

function createLinkSpaceContent(element) {
    var template = `
        <span class="message">
            Select a part of text above to get its span-url.
        </span>`

    return element.innerHTML = template
}

function updateLinkSpaceContent(element, select, url) {
    var template = `<span class="range">${select}</span><a class="link" href="${url}">&lt${url}&gt</a>`

    element.innerHTML = template
}

function selected(linkSpace, select) {
    var url = pathJoin(location.href, 'spans/' + select)

    updateLinkSpaceContent(linkSpace, select, url)
}

function bindEvent($target, linkSpace) {
    var observer = new SelectionObserver()

    $target
        .on('click', observer.handler)

    observer.observable((select) => selected(linkSpace, select))
}

function linkToSelectedSpan(selector) {
    var $target = this,
        linkSpaces = document.querySelectorAll(selector)

    if (linkSpaces.length === 0) {
        console.warn('no element is found. selector: ', selector)
        return
    }

    createLinkSpaceContent(linkSpaces[0])
    bindEvent($target, linkSpaces[0])

    console.log('start to observe element.')
    return this
}

function main() {
    jQuery.fn.linkToSelectedSpan = linkToSelectedSpan
}
