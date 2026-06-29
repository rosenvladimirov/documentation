/* global Immutable, React */
(function () {
    // NOTE: used by accounting cheat_sheet.rst
    'use strict';

    // i18n: превод на render-точките само при <html lang=bg>; en остава непокътнат
    var __BG = {
        "Profit & Loss": "Печалба и загуба",
        "Net Profit": "Нетна печалба",
        "Gross Profit": "Брутна печалба",
        "Revenue": "Приходи",
        "Less ": "Минус ",
        "Plus ": "Плюс ",
        "Costs of Revenue": "Разходи за дейността",
        "Cost of Goods Sold": "Себестойност на продадените стоки",
        "Operating Income or Loss": "Оперативна печалба или загуба",
        "Operating Expenses": "Оперативни разходи",
        "R&D": "НИРД",
        "Sales, General & Administrative": "Търговски, общи и административни разходи",
        "Other Income": "Други приходи",
        "Foreign Exchange Gains": "Печалби от валутни операции",
        "Asset write-downs": "Обезценки на активи",
        "Other Expenses": "Други разходи",
        "Interest on debt": "Лихви по задължения",
        "Depreciation": "Амортизация",
        "Balance Sheet": "Счетоводен баланс",
        "Net Assets": "Нетни активи",
        "Total Assets": "Общо активи",
        "Current Assets": "Текущи активи",
        "Cash & Bank Accounts": "Парични средства и банкови сметки",
        "Accounts Receivable": "Вземания от клиенти",
        "Deferred Tax Assets": "Активи по отсрочени данъци",
        "Non-current Assets": "Нетекущи активи",
        "Land & buildings": "Земи и сгради",
        "Intangible Assets": "Нематериални активи",
        "Current Liabilities": "Текущи пасиви",
        "Accounts Payable": "Задължения към доставчици",
        "Deferred Revenue": "Приходи за бъдещи периоди",
        "Deferred Tax Liabilities": "Пасиви по отсрочени данъци",
        "Non-current liabilities": "Нетекущи пасиви",
        "Long-term loans": "Дългосрочни заеми",
        "Total Equity": "Общо собствен капитал",
        "Equity": "Собствен капитал",
        "Common Stock": "Основен капитал",
        "Retained Earnings": "Неразпределена печалба",
        "Debit": "Дебит",
        "Credit": "Кредит",
        "Balance": "Салдо",
        "Assets": "Активи",
        "Liabilities": "Пасиви",
        "Expenses": "Разходи",
        "Cash": "Парични средства",
        "Inventory": "Материални запаси",
        "Goods Issued Not Invoiced": "Експедирани нефактурирани стоки",
        "Buildings": "Сгради",
        "Accumulated Depreciation": "Натрупана амортизация",
        "Goods Received Not Purchased": "Получени нефактурирани стоки",
        "Goods": "Стоки",
        "Services": "Услуги",
        "Other Operating Expenses": "Други оперативни разходи",
        "Price Difference": "Ценова разлика",
        "Company Incorporation (Initial Capital $1,000)": "Учредяване на дружество (начален капитал $1 000)",
        "Customer Invoice ($100 + 9% tax) & Shipping of the Goods": "Фактура към клиент ($100 + 9% данък) и експедиция на стоките",
        "Goods Shipment to Customer": "Експедиция на стоки до клиент",
        "Customer Refund*": "Кредитно известие към клиент*",
        "Customer Payment*": "Плащане от клиент*",
        "Vendor Goods Received (Purchase Order: $50)": "Получени стоки от доставчик (поръчка: $50)",
        "Vendor Bill (Invoice: $50)": "Фактура от доставчик (фактура: $50)",
        "Vendor Bill (Invoice: $52 but PO $50)": "Фактура от доставчик (фактура: $52 при поръчка $50)",
        "Vendor Bill Paid ($52 + 9% tax)": "Платена фактура от доставчик ($52 + 9% данък)",
        "Acquire a building (purchase contract)": "Придобиване на сграда (договор за покупка)",
        "Pay for building": "Плащане за сградата",
        "Yearly Asset Depreciation (10% per year)": "Годишна амортизация на актив (10% годишно)",
        "Customer Invoice (3 years service contract, $300)": "Фактура към клиент (3-годишен сервизен договор, $300)",
        "Revenue Recognition (each year, including first)": "Признаване на приход (всяка година, вкл. първата)",
        "Pay Taxes Due": "Плащане на дължими данъци",
        "Explanation": "Обяснение",
        "Configuration": "Конфигурация",
        "Assets: Cash": "Активи: Парични средства",
        "Equity: Common Stock": "Собствен капитал: Основен капитал",
        "Revenue: Goods": "Приходи: Стоки",
        "Liabilities: Deferred Tax Liabilities": "Пасиви: Пасиви по отсрочени данъци",
        "Assets: Accounts Receivable": "Активи: Вземания от клиенти",
        "Assets: Inventory": "Активи: Материални запаси",
        "Expenses: Cost of Goods Sold": "Разходи: Себестойност на продадените стоки",
        "Assets: Uninvoiced Inventory": "Активи: Нефактурирани материални запаси",
        "Assets: Deferred Tax Assets": "Активи: Активи по отсрочени данъци",
        "Expenses: Price Difference": "Разходи: Ценова разлика",
        "Liabilities: Accounts Payable": "Пасиви: Задължения към доставчици",
        "Assets: Buildings": "Активи: Сгради",
        "Revenue: Sales Discount": "Приходи: Търговска отстъпка",
        "Equity: Retained Earnings": "Собствен капитал: Неразпределена печалба",
        "Liabilities: Dividend Payable": "Пасиви: Задължения за дивиденти",
        "Company Incorporation": "Учредяване на дружество",
        "Customer Invoice ($100 + 9% tax)": "Фактура към клиент ($100 + 9% данък)",
        "Customer payment": "Плащане от клиент",
        "Supplier Bill (Purchase Order $50 but Invoice $52)": "Фактура от доставчик (поръчка $50 при фактура $52)",
        "Supplier Goods Received (Purchase Order: $50)": "Получени стоки от доставчик (поръчка: $50)",
        "Buy an asset ($300,000 - no tax)": "Покупка на актив ($300 000 — без данък)",
        "Pay supplier invoice": "Плащане на фактура от доставчик",
        "Cash sale (Sales Receipt)": "Продажба в брой (касова бележка)",
        "Customer pays invoice, 5% early payment rebate": "Клиент плаща фактура, 5% отстъпка за ранно плащане",
        "Fiscal year closing — positive earnings and 50% dividends": "Приключване на финансовата година — положителен резултат и 50% дивиденти",
        "The company receives $1,000 in cash": "Дружеството получава $1 000 в брой",
        "Shares worth of $1,000 belong to the founders": "Дялове на стойност $1 000 принадлежат на учредителите",
        "The initial capital can be cash, but could also be intellectual property, goodwill from a previous company, licences, know how, etc…": "Началният капитал може да е в брой, но също интелектуална собственост, репутация от предходно дружество, лицензи, ноу-хау и т.н.…",
        "Sometimes, capital is not released immediately, accounts for \"capital to be released\" may be necessary.": "Понякога капиталът не се освобождава веднага — може да са нужни сметки за „капитал за освобождаване“.",
        "Revenues increase by $100": "Приходите се увеличават с $100",
        "A tax to pay at the end of the month of $9": "Данък за плащане в края на месеца — $9",
        "The customer owes $109": "Клиентът дължи $109",
        "The inventory is decreased by $50 (shipping of the goods)": "Материалните запаси намаляват с $50 (експедиция на стоките)",
        "The cost of goods sold decreases the gross profit by $50": "Себестойността на продадените стоки намалява брутната печалба с $50",
        "The company receives $109 in cash": "Дружеството получава $109 в брой",
        "The receivable held against the client is reduced by $109": "Вземането от клиента намалява с $109",
        "A temporary account is used to note goods to receive": "Използва се временна сметка за стоките за получаване",
        "The purchase order provides prices of goods, the actual invoice may include extra costs such as shipping": "Поръчката дава цените на стоките, а самата фактура може да включва допълнителни разходи като транспорт",
        "The company still needs to pay the vendor (traded an asset against a liability)": "Дружеството все още дължи плащане на доставчика (заменен е актив срещу пасив)",
        "Inventory is increased by $50, the expected amount coming from the purchase order": "Материалните запаси се увеличават с $50 — очакваната сума по поръчката",
        "A temporary account is used for the counterpart and will be cleared when receiving the invoice": "Използва се временна сметка за кореспондиращата страна, която се закрива при получаване на фактурата",
        "The company gets an asset worth of $300,000": "Дружеството придобива актив на стойност $300 000",
        "The company needs to pay $300,000 to the vendor (traded an asset against a liability)": "Дружеството трябва да плати $300 000 на доставчика (заменен е актив срещу пасив)",
        "The company owns $300,000 less to the supplier (liabilities are settled)": "Дружеството дължи $300 000 по-малко на доставчика (пасивите са погасени)",
        "The company's cash is reduced by $300,000 (reduction of asset)": "Паричните средства на дружеството намаляват с $300 000 (намаление на актив)",
        "Company's cash is increased by $109": "Паричните средства на дружеството се увеличават с $109",
        "A tax of $9 has to be paid": "Дължи се данък от $9",
        "Company's cash is increased by $950": "Паричните средства на дружеството се увеличават с $950",
        "Sales discounts lowering effective revenues by $50": "Търговските отстъпки намаляват ефективните приходи с $50",
        "The customer owns $1000 less to the company": "Клиентът дължи $1000 по-малко на дружеството",
        "The P&L is cleared (net profit)": "Отчетът за приходите и разходите се закрива (нетна печалба)",
        "50% is transferred to retained earnings": "50% се отнасят към неразпределена печалба",
        "50% will be paid to shareholders as dividends": "50% ще се изплатят на акционерите като дивиденти",
        "Revenue: defined on the product, or the product category if not on the product, field Income Account": "Приход: задава се върху продукта или върху продуктовата категория, ако липсва на продукта — поле „Приходна сметка“",
        "Deferred Tax Liabilities: defined on the tax used on the invoice line": "Пасиви по отсрочени данъци: задават се върху данъка, използван на реда от фактурата",
        "Accounts Receivable: defined on the customer (property)": "Вземания от клиенти: задават се върху клиента (property)",
        "Inventory: defined on the category of the related product (property)": "Материални запаси: задават се върху категорията на свързания продукт (property)",
        "Expenses: defined on the product, or the category of product (property)": "Разходи: задават се върху продукта или категорията на продукта (property)",
        "The fiscal position used on the invoice may have a rule that replaces the Income Account or the tax defined on the product by another one.": "Фискалната позиция на фактурата може да има правило, което заменя приходната сметка или данъка от продукта с друг.",
        "Cash: defined on the journal used when registering the payment, fields Default Credit Account and Default Debit Account": "Парични средства: задават се върху дневника при регистриране на плащането — полета „Кредитна сметка по подразбиране“ и „Дебитна сметка по подразбиране“",
        "Uninvoiced Inventory: defined on the product or the category of related product, field: Stock Input Account": "Нефактурирани запаси: задават се върху продукта или категорията на свързания продукт — поле „Складова входяща сметка“",
        "Deferred Tax Assets: defined on the tax used on the purchase order line": "Активи по отсрочени данъци: задават се върху данъка, използван на реда от поръчката",
        "Accounts Payable: defined on the supplier related to the bill": "Задължения към доставчици: задават се върху доставчика, свързан с фактурата",
        "In this scenario, the purchase order was $50 but the company received an invoice for $52 as there were extra shipping costs": "В този сценарий поръчката е $50, но дружеството получава фактура за $52 поради допълнителни транспортни разходи",
        "Inventory: defined on the product category, field: Stock Valuation": "Материални запаси: задават се върху продуктовата категория — поле „Складова оценка“",
        "Buildings: Defined on the Asset category selected on the supplier bill line": "Сгради: задават се върху категорията актив, избрана на реда от фактурата на доставчика",
        "Accounts Payable: defined on the supplier related to the bill (property)": "Задължения към доставчици: задават се върху доставчика, свързан с фактурата (property)",
        "Accounts Payable: defined on the supplier you pay (property)": "Задължения към доставчици: задават се върху доставчика, на когото плащате (property)",
        "Cash: defined on the journal related to the payment method": "Парични средства: задават се върху дневника, свързан с метода на плащане",
        "Cash: Payment method defined on the Sales Receipt": "Парични средства: методът на плащане се задава върху касовата бележка",
        "Sales: Defined on the product used in the sales receipt, or the category of product if empty": "Продажби: задават се върху продукта в касовата бележка или върху категорията на продукта, ако е празно",
        "Deferred Tax Liabilities: Defined on the tax used in the sales receipt (coming from the product)": "Пасиви по отсрочени данъци: задават се върху данъка в касовата бележка (идващ от продукта)",
        "Cash: is defined on the journal related to the payment / bank statement": "Парични средства: задават се върху дневника, свързан с плащането / банковото извлечение",
        "Sales Discount: is selected during the payment matching process": "Търговска отстъпка: избира се по време на съпоставянето на плащането",
        "Accounts Receivable: is defined on the customer associated to the payment": "Вземания от клиенти: задават се върху клиента, свързан с плащането",
        "This transaction is recorded by the advisor before closing the fiscal year, depending on how the company uses its net profit.": "Тази операция се осчетоводява от експерта преди приключване на финансовата година, в зависимост от това как дружеството използва нетната си печалба."
};
    var __isBG = (document.documentElement.lang || '').toLowerCase().indexOf('bg') === 0;
    function t(s) { return (__isBG && typeof s === 'string' && __BG[s]) ? __BG[s] : s; }
    window.__cheat_t = t;

    function highlight(primary, secondary) {
        return {
            className: React.addons.classSet({
                related: primary,
                secondary: secondary
            })
        };
    }
    var AccountsTable = React.createClass({
        render: function () {
            return React.DOM.div(
                { style: { marginTop: '0' } },
                React.DOM.div(// P&L
                    highlight(this.props.current === 'p-l'),
                    React.DOM.h4(null, t("Profit & Loss")),
                    React.DOM.div(
                        null,
                        React.DOM.h5(
                            highlight(null, this.props.current === 'retained'),
                            t("Net Profit")),
                        React.DOM.div(
                            highlight(null, this.props.current === 'gross-profit'),
                            React.DOM.h5(
                                highlight(this.props.current === 'gross-profit'),
                                t("Gross Profit")),
                            React.DOM.dl(
                                null,
                                React.DOM.dt(null, t("Revenue")),
                                React.DOM.dd(
                                    null,
                                    t("Revenue")
                                ),
                                React.DOM.dt(null, t("Less "), t("Costs of Revenue")),
                                React.DOM.dd(
                                    null,
                                    t("Cost of Goods Sold")
                                )
                            )
                        ),
                        React.DOM.div(
                            highlight(this.props.current === 'opex'),
                            React.DOM.h5(null, t("Operating Income or Loss")),
                            React.DOM.dl(
                                null,
                                React.DOM.dt(
                                    null,
                                    t("Less "), t("Operating Expenses")),
                                React.DOM.dd(
                                    null,
                                    t("R&D"), React.DOM.br(),
                                    t("Sales, General & Administrative")
                                )
                            )
                        ),
                        React.DOM.dl(
                            null,
                            React.DOM.dt(null, t("Plus "), t("Other Income")),
                            React.DOM.dd(
                                null,
                                t("Foreign Exchange Gains"), React.DOM.br(),
                                t("Asset write-downs")
                            ),
                            React.DOM.dt(
                                null,
                                t("Less "), t("Other Expenses")),
                            React.DOM.dd(
                                null,
                                t("Interest on debt"), React.DOM.br(),
                                t("Depreciation")
                            )
                        )
                    )
                ),
                React.DOM.div(//Balance Sheet
                    highlight(this.props.current === 'balance'),
                    React.DOM.h4(null, t("Balance Sheet")),
                    React.DOM.div(
                        null,
                        React.DOM.h5(null, t("Net Assets")),
                        React.DOM.div(
                            null,
                            React.DOM.h5(highlight(this.props.current === 'assets'), t("Total Assets")),
                            React.DOM.dl(
                                highlight(null, this.props.current === 'assets'),
                                React.DOM.dt(null, t("Current Assets")),
                                React.DOM.dd(
                                    null,
                                    t("Cash & Bank Accounts"), React.DOM.br(),
                                    t("Accounts Receivable"), React.DOM.br(),
                                    t("Deferred Tax Assets")
                                ),
                                React.DOM.dt(null, t("Plus "), t("Non-current Assets")),
                                React.DOM.dd(
                                    null,
                                    t("Land & buildings"), React.DOM.br(),
                                    t("Intangible Assets")
                                )
                            )
                        ),
                        React.DOM.dl(
                            highlight(this.props.current === 'liabilities'),
                            React.DOM.dt(null, t("Less "), t("Current Liabilities")),
                            React.DOM.dd(
                                null,
                                t("Accounts Payable"), React.DOM.br(),
                                t("Deferred Revenue"), React.DOM.br(),
                                t("Deferred Tax Liabilities")),
                            React.DOM.dt(null, t("Less "), t("Non-current liabilities")),
                            React.DOM.dd(
                                null,
                                t("Long-term loans"))
                        )
                    ),
                    React.DOM.div(
                        highlight(null, this.props.current === 'equity'),
                        React.DOM.h5(highlight(this.props.current === 'equity'), t("Total Equity")),
                        React.DOM.dl(
                            null,
                            React.DOM.dt(null, t("Equity")),
                            React.DOM.dd(
                                null,
                                t("Common Stock")
                            ),
                            React.DOM.dt(
                                highlight(this.props.current === 'retained'),
                                t("Plus "), t("Retained Earnings")
                            )
                        )
                    )
                )
            );
        }
    });

    document.addEventListener('DOMContentLoaded', function () {
        var target = document.querySelector('.accounts-table');
        if (!target) { return; }
        function render(current) {
            React.render(
                React.createElement(AccountsTable, { current: current }),
                target);
        }

        var list = document.querySelectorAll('.intro-list p');
        Array.prototype.forEach.call(list, function (node) {
            node.addEventListener('mouseover', function (e) {
                if (!e.currentTarget.contains(e.target)) { return; }

                e.currentTarget.classList.add('secondary');
                render(e.currentTarget.className.split(/\s+/).reduce(function (acc, cls) {
                    if (acc) { return acc; }
                    var m = /^intro-(.*)$/.exec(cls);
                    return m && m[1];
                }, null));
            });
            node.addEventListener('mouseout', function (e) {
                // mouseout always precedes mousenter even when going into a
                // child element. Since re-render should be pretty fast (just
                // setting or unsetting a pair of classes) don't try to avoid
                // any thrashing, things should be fast enough either way. If
                // they're not, batch operations on requestAnimationFrame
                // instead.
                e.currentTarget.classList.remove('secondary');
                render(null);
            });
        });

        render(null);
    });
})();
