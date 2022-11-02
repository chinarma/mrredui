/*
 * @Project: Mr.red
 * @Author: chinarma@qq.com
 * @Date: 2022-08-18 17:57:30
 * @LastEditTime: 2022-08-26 00:08:38
 */
const icons = {
    download: `<svg t="1667216048364" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7023" width="1em"><path d="M760.4736 493.9264a25.6 25.6 0 0 0-36.1984 0L512 706.2016V128a25.6 25.6 0 0 0-51.2 0v578.2016L248.5248 493.9264a25.6 25.6 0 0 0-36.1984 36.1984l256 256a25.4976 25.4976 0 0 0 36.2496-0.0512l256-256a25.6 25.6 0 0 0 0-36.1984z" fill="" p-id="7024"></path><path d="M896 972.8h-819.2C34.4576 972.8 0 938.3424 0 896v-102.4a25.6 25.6 0 0 1 51.2 0v102.4a25.6 25.6 0 0 0 25.6 25.6h819.2a25.6 25.6 0 0 0 25.6-25.6v-102.4a25.6 25.6 0 0 1 51.2 0v102.4c0 42.3424-34.4576 76.8-76.8 76.8z" fill="" p-id="7025"></path></svg>`,
    square_plus:
        '<svg t="1667215450033" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4819" width="1em" ><path d="M797.866667 960H226.133333a162.56 162.56 0 0 1-162.133333-162.133333V226.133333a162.56 162.56 0 0 1 162.133333-162.133333h571.733334a162.56 162.56 0 0 1 162.133333 162.133333v571.733334a162.56 162.56 0 0 1-162.133333 162.133333zM226.133333 106.666667a119.893333 119.893333 0 0 0-119.466666 119.466666v571.733334a119.893333 119.893333 0 0 0 119.466666 119.466666h571.733334a119.893333 119.893333 0 0 0 119.466666-119.466666V226.133333a119.893333 119.893333 0 0 0-119.466666-119.466666z" p-id="4820"></path><path d="M512 768a21.333333 21.333333 0 0 1-21.333333-21.333333V304.213333a21.333333 21.333333 0 1 1 42.666666 0v440.746667a21.333333 21.333333 0 0 1-21.333333 23.04z" p-id="4821"></path><path d="M732.586667 545.706667H291.413333a21.333333 21.333333 0 0 1-21.333333-21.333334 21.76 21.76 0 0 1 21.333333-21.333333h441.173334a21.76 21.76 0 0 1 21.333333 21.333333 21.333333 21.333333 0 0 1-21.333333 21.333334z" p-id="4822"></path></svg>',
    square_minus:
        '<svg t="1667215510895" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4967" width="1em"><path d="M797.866667 960H226.133333a162.56 162.56 0 0 1-162.133333-162.133333V226.133333a162.56 162.56 0 0 1 162.133333-162.133333h571.733334a162.56 162.56 0 0 1 162.133333 162.133333v571.733334a162.56 162.56 0 0 1-162.133333 162.133333zM226.133333 106.666667a119.893333 119.893333 0 0 0-119.466666 119.466666v571.733334a119.893333 119.893333 0 0 0 119.466666 119.466666h571.733334a119.893333 119.893333 0 0 0 119.466666-119.466666V226.133333a119.893333 119.893333 0 0 0-119.466666-119.466666z" p-id="4968"></path><path d="M732.586667 533.333333H291.413333a21.333333 21.333333 0 1 1 0-42.666666h441.173334a21.333333 21.333333 0 0 1 0 42.666666z" p-id="4969"></path></svg>',

    excel: '<svg t="1667215741433" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1042" width="1em"><path d="M563.2 1006.933333s-3.413333 0 0 0l-549.546667-102.4c-6.826667-3.413333-13.653333-10.24-13.653333-17.066666V170.666667c0-6.826667 6.826667-13.653333 13.653333-17.066667l546.133334-136.533333c3.413333 0 10.24 0 13.653333 3.413333 3.413333 3.413333 6.826667 6.826667 6.826667 13.653333v955.733334c0 3.413333-3.413333 10.24-6.826667 13.653333-3.413333 3.413333-6.826667 3.413333-10.24 3.413333zM34.133333 873.813333l512 95.573334V54.613333L34.133333 184.32v689.493333z" fill="" p-id="1043"></path><path d="M1006.933333 938.666667h-443.733333c-10.24 0-17.066667-6.826667-17.066667-17.066667s6.826667-17.066667 17.066667-17.066667H989.866667v-785.066666H580.266667c-10.24 0-17.066667-6.826667-17.066667-17.066667s6.826667-17.066667 17.066667-17.066667h426.666666c10.24 0 17.066667 6.826667 17.066667 17.066667v819.2c0 10.24-6.826667 17.066667-17.066667 17.066667zM392.533333 699.733333c-6.826667 0-10.24-3.413333-13.653333-6.826666l-204.8-341.333334c-6.826667-10.24-3.413333-20.48 3.413333-23.893333s17.066667-3.413333 23.893334 6.826667l204.8 341.333333c3.413333 6.826667 3.413333 17.066667-6.826667 23.893333h-6.826667z" fill="" p-id="1044"></path><path d="M187.733333 699.733333c-3.413333 0-6.826667 0-10.24-3.413333-6.826667-3.413333-10.24-13.653333-3.413333-23.893333l204.8-341.333334c3.413333-6.826667 13.653333-10.24 23.893333-6.826666 6.826667 3.413333 10.24 13.653333 6.826667 23.893333l-204.8 341.333333c-6.826667 6.826667-10.24 10.24-17.066667 10.24zM733.866667 938.666667c-10.24 0-17.066667-6.826667-17.066667-17.066667V119.466667c0-10.24 6.826667-17.066667 17.066667-17.066667s17.066667 6.826667 17.066666 17.066667V921.6c0 10.24-6.826667 17.066667-17.066666 17.066667z" fill="" p-id="1045"></path><path d="M989.866667 802.133333H563.2c-10.24 0-17.066667-6.826667-17.066667-17.066666s6.826667-17.066667 17.066667-17.066667H989.866667c10.24 0 17.066667 6.826667 17.066666 17.066667s-6.826667 17.066667-17.066666 17.066666zM1006.933333 665.6h-443.733333c-10.24 0-17.066667-6.826667-17.066667-17.066667s6.826667-17.066667 17.066667-17.066666h443.733333c10.24 0 17.066667 6.826667 17.066667 17.066666s-6.826667 17.066667-17.066667 17.066667zM1006.933333 529.066667H580.266667c-10.24 0-17.066667-6.826667-17.066667-17.066667s6.826667-17.066667 17.066667-17.066667h426.666666c10.24 0 17.066667 6.826667 17.066667 17.066667s-6.826667 17.066667-17.066667 17.066667zM1000.106667 392.533333H573.44c-10.24 0-17.066667-6.826667-17.066667-17.066666s6.826667-17.066667 17.066667-17.066667h426.666667c10.24 0 17.066667 6.826667 17.066666 17.066667s-10.24 17.066667-17.066666 17.066666zM1006.933333 256h-443.733333c-10.24 0-17.066667-6.826667-17.066667-17.066667s6.826667-17.066667 17.066667-17.066666h443.733333c10.24 0 17.066667 6.826667 17.066667 17.066666s-6.826667 17.066667-17.066667 17.066667z" fill="" p-id="1046"></path></svg>',

    restore:
        '<svg t="1661434251863" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4524" width="1em"><path d="M745.01688889 259.56503666c-126.2174811-116.50844445-320.39822222-121.36296334-451.47022222-14.56355556S123.6385189 541.12711111 211.01985223 686.76266667c67.96325888 121.36296334 203.88977778 189.32622222 344.67081444 169.90814776s252.43496334-116.50844445 291.27111111-252.4349622c9.70903666-38.83614777 48.54518557-58.25422222 87.38133333-48.54518556 38.83614777 9.70903666 58.25422222 48.54518557 48.54518556 87.38133333-77.67229667 257.2894811-344.67081443 402.92503666-597.10577777 330.10725888C128.49303666 900.3614811-21.99703666 633.36296334 50.82074112 376.0734811c48.54518557-165.05363001 174.76266667-291.27111111 339.81629554-339.81629553s339.81629667 0 461.17926001 116.50844444l92.2358511-92.23585223c9.70903666-9.70903666 24.27259221-14.56355555 38.8361489-9.70903666 4.8545189 14.56355555 14.56355555 24.27259221 14.56355556 38.83614777v300.98014777c0 19.41807445-14.56355555 33.98163001-33.98163001 33.98163001h-296.12563001c-14.56355555 0-29.12711111-9.70903666-33.98162887-19.41807446s0-29.12711111 9.70903666-38.83614776l101.94488889-106.79940779z" p-id="4525"></path></svg>',

    wheel: '<svg t="1661433586883" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2029" width="1.2em"><path d="M512 510.90941968c-22.35689648 0-40.89676184-17.99457522-40.89676184-40.89676185V342.41476087c0-22.35689648 17.99457522-40.89676184 40.89676184-40.89676185 22.35689648 0 40.89676184 17.99457522 40.89676184 40.89676185v127.59789696c0 22.90218663-18.53986537 40.89676184-40.89676184 40.89676185z" fill="#2c2c2c" p-id="2030"></path><path d="M657.04718202 131.9327599h-110.69390207v-18.53986537c0-38.71560122-21.26631616-74.70475164-55.07430596-93.78990717l-32.17211932-17.99457521c-16.35870474-9.26993269-37.07973073-3.27174094-46.34966343 13.0869638-9.26993269 16.35870474-3.27174094 37.07973073 13.0869638 46.34966343l32.17211933 17.9945752c12.54167363 7.08877205 20.17573584 20.17573584 20.17573583 34.35327995v18.53986537H366.95281798c-108.51274143 0-196.30445688 88.33700559-196.30445687 196.30445686v298.81900657c0 181.58162259 147.77363281 329.90054556 329.90054557 329.90054556h23.4474768c181.58162259 0 329.90054556-147.77363281 329.90054557-329.90054556V328.23721676c-0.54529015-107.96745129-88.33700559-196.30445688-196.84974703-196.30445686z m128.14318712 495.66875358c0 143.9566017-117.23738396 261.73927581-261.73927582 261.73927583h-23.4474768c-143.9566017 0-261.19398567-117.23738396-261.19398566-261.73927583V328.23721676c0-70.88772053 57.80075674-128.14318712 128.14318712-128.14318712h290.09436404c70.88772053 0 128.14318712 57.80075674 128.14318712 128.14318712v299.36429672z" fill="#2c2c2c" p-id="2031"></path></svg>',
    page_nav:
        '<svg t="1661433737997" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2508" width="1.2em"><path d="M787.692308 157.538462a78.769231 78.769231 0 0 1 78.76923 78.76923v551.384616a78.769231 78.769231 0 0 1-78.76923 78.76923H236.307692a78.769231 78.769231 0 0 1-78.76923-78.76923V236.307692a78.769231 78.769231 0 0 1 78.76923-78.76923h551.384616z m-295.384616 39.384615H236.307692a39.384615 39.384615 0 0 0-39.108923 34.776615L196.923077 236.307692v551.384616a39.384615 39.384615 0 0 0 34.776615 39.108923L236.307692 827.076923h256V196.923077zM787.692308 196.923077h-256v630.153846H787.692308a39.384615 39.384615 0 0 0 39.108923-34.776615L827.076923 787.692308V236.307692a39.384615 39.384615 0 0 0-34.776615-39.108923L787.692308 196.923077z m-381.952 223.547077a19.692308 19.692308 0 0 1 2.284307 25.127384l-2.284307 2.756924-62.818462 62.739692 64.708923 64.748308a19.692308 19.692308 0 0 1 2.244923 25.127384l-2.244923 2.717539a19.692308 19.692308 0 0 1-25.127384 2.284307l-2.756923-2.284307-78.611693-78.611693a19.692308 19.692308 0 0 1-2.244923-25.127384l2.244923-2.756923 76.760616-76.721231a19.692308 19.692308 0 0 1 27.844923 0z m212.676923 0a19.692308 19.692308 0 0 1 27.884307 0l76.721231 76.760615 2.284308 2.717539a19.692308 19.692308 0 0 1-2.284308 25.127384l-78.611692 78.611693-2.756923 2.284307a19.692308 19.692308 0 0 1-25.088-2.284307l-2.284308-2.756923a19.692308 19.692308 0 0 1 2.284308-25.088l64.669538-64.748308-62.818461-62.739692-2.244923-2.756924a19.692308 19.692308 0 0 1 2.244923-25.127384z" fill="#333333" p-id="2509"></path></svg>',

    double_down:
        '<svg t="1661443645610" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8241" width="2em"><path d="M493.504 558.144a31.904 31.904 0 0 0 45.28 0l308.352-308.352a31.968 31.968 0 1 0-45.248-45.248l-285.728 285.728-294.176-294.144a31.968 31.968 0 1 0-45.248 45.248l316.768 316.768z" p-id="8242"></path><path d="M801.888 460.576l-285.728 285.728-294.144-294.144a31.968 31.968 0 1 0-45.248 45.248l316.768 316.768a31.904 31.904 0 0 0 45.28 0l308.352-308.352a32 32 0 1 0-45.28-45.248z" p-id="8243"></path></svg>',

    more: '<svg t="1667108848445" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4671" width="2em" ><path d="M192 512m-128 0a2 2 0 1 0 256 0 2 2 0 1 0-256 0Z" p-id="4672"></path><path d="M512 512m-128 0a2 2 0 1 0 256 0 2 2 0 1 0-256 0Z" p-id="4673"></path><path d="M832 512m-128 0a2 2 0 1 0 256 0 2 2 0 1 0-256 0Z" p-id="4674"></path></svg>',

    full_screen: `<svg t="1663760050222" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5362" width="1.5em"><path d="M85.333333 682.666667v128a128 128 0 0 0 128 128h128a42.666667 42.666667 0 0 0 0-85.333334H213.333333a42.666667 42.666667 0 0 1-42.666666-42.666666v-128a42.666667 42.666667 0 0 0-85.333334 0z m597.333334 256h128a128 128 0 0 0 128-128v-128a42.666667 42.666667 0 0 0-85.333334 0v128a42.666667 42.666667 0 0 1-42.666666 42.666666h-128a42.666667 42.666667 0 0 0 0 85.333334z m256-597.333334V213.333333a128 128 0 0 0-128-128h-128a42.666667 42.666667 0 0 0 0 85.333334h128a42.666667 42.666667 0 0 1 42.666666 42.666666v128a42.666667 42.666667 0 0 0 85.333334 0zM341.333333 85.333333H213.333333a128 128 0 0 0-128 128v128a42.666667 42.666667 0 0 0 85.333334 0V213.333333a42.666667 42.666667 0 0 1 42.666666-42.666666h128a42.666667 42.666667 0 0 0 0-85.333334z" p-id="5363"></path></svg>`,
};

export default icons;