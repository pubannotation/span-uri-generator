import observ from 'observ'
import pathJoin from './pathJoin'
import SelectionObserver from './SelectionObserver'

main()

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
    var observer = new SelectionObserver()

    $target
        .on('click', observer.handler)

    observer.observable((select) => selected($linkSpace, select))
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
