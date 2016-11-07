import url from 'url'
import observ from 'observ'
import pathJoin from './pathJoin'
import SelectionObserver from './SelectionObserver'

main()

function createLinkSpaceContent(element) {
    var template = `
        <span class="message">
            Select a part of text above to get its span-url.
        </span>`

    element.innerHTML = template
}

function updateLinkSpaceContent(element, select, url) {
    var template = `<a class="link" href="${url}">&lt${url}&gt</a>`

    element.innerHTML = template
}

function toSelectString(select) {
    return select.begin + '-' + select.end
}

function selected(linkSpace, select) {
    var parsed = url.parse(location.href),
        selectString = toSelectString(select),
        pathname = parsed.pathname.replace(/spans\/\d+-\d+/, '')

    parsed.pathname = pathJoin(pathname, `spans/${selectString}`)

    updateLinkSpaceContent(linkSpace, selectString, url.format(parsed))
}

function bindEvent($target, linkSpace) {
    var observer = new SelectionObserver()

    $target
        .on('click', observer.handler)

    observer.observable((select) => selected(linkSpace, select))
}

function linkToSelectedSpan(selector) {
    var $target = this,
        linkSpace = document.querySelector(selector)

    if (!linkSpace) {
        console.warn('no element is found. selector: ', selector)
        return
    }

    createLinkSpaceContent(linkSpace)
    bindEvent($target, linkSpace)

    console.log('start to observe element.')
    return this
}

function main() {
    jQuery.fn.linkToSelectedSpan = linkToSelectedSpan
}
