/* global Immutable, React */
/* global createAtom, findAncestor */
(function () {
    'use strict';

    var t = window.__cheat_t || function (s) { return s; };
    var isBG = (document.documentElement.lang || '').toLowerCase().indexOf('bg') === 0;
    // NOTE: used by accounting cheat_sheet.rst

    var data = createAtom();
    data.addWatch('chart', function (k, m, prev, next) {
        React.render(
            React.createElement(Controls, { entry: next }),
            document.getElementById('entries-control'));
        React.render(
            React.createElement(FormatEntry, { entry: next }),
            document.querySelector('.journal-entries'));
    });
    document.addEventListener('DOMContentLoaded', function () {
        var entries_section = findAncestor(document.querySelector('.journal-entries'), 'section');
        if (!entries_section) { return; }

        var controls = document.createElement('div');
        controls.setAttribute('id', 'entries-control');
        entries_section.insertBefore(controls, entries_section.lastElementChild);

        data.reset(entries.first());
    });

    var Controls = React.createClass({
        render: function () {
            var _this = this;
            return React.DOM.div(
                null,
                entries.map(function (entry, index) {
                    return React.DOM.label(
                        {
                            key: index,
                            style: { display: 'block' },
                        },
                        React.DOM.input({
                            type: 'radio',
                            checked: Immutable.is(entry, this.props.entry),
                            onChange: function (e) {
                                data.reset(entry);
                            }
                        }),
                        ' ',
                        t(entry.get('title'))
                    );
                }, this),
                this.props.entry && React.DOM.p(null, t(this.props.entry.get('help')))
            );
        }
    });
    var FormatEntry = React.createClass({
        render: function () {
            var entry = this.props.entry;
            return React.DOM.div(
                null,
                React.DOM.table(
                    { className: 'table table-sm d-c-table' },
                    React.DOM.thead(
                        null,
                        React.DOM.tr(
                            null,
                            React.DOM.th(),
                            React.DOM.th(null, t("Debit")),
                            React.DOM.th(null, t("Credit"))
                        )
                    ),
                    React.DOM.tbody(
                        null,
                        this.render_rows()
                    )
                ),
                React.createElement(Listing, {
                    heading: t("Explanation"),
                    items: entry && entry.get('explanation')
                }),
                React.createElement(Listing, {
                    heading: t("Configuration"),
                    items: entry && entry.get('configuration')
                })
            );
        },
        render_rows: function () {
            if (!this.props.entry) { return; }
            return this.props.entry.get('operations').map(this.render_row);
        },
        render_row: function (entry, index) {
            if (!entry) {
                return React.DOM.tr(
                    { key: 'spacer-' + index },
                    React.DOM.td({ colSpan: 3 }, "\u00A0")
                );
            }
            return React.DOM.tr(
                { key: index },
                React.DOM.td(null, t(entry.get('account'))),
                React.DOM.td(null, entry.get('debit')),
                React.DOM.td(null, entry.get('credit'))
            );
        }
    });
    var Listing = React.createClass({
        render: function () {
            if (!this.props.items || this.props.items.isEmpty()) {
                return React.DOM.div();
            }
            var items = this.props.items, epilog = Immutable.List();
            var idx = items.indexOf(null);
            if (idx !== -1) {
                epilog = items.slice(idx + 1);
                items = items.take(idx);
            }
            return React.DOM.div(
                { className: 'entries-listing' },
                React.DOM.h4(null, this.props.heading, ':'),
                React.DOM.ul(
                    null,
                    items.map(function (item, index) {
                        return React.DOM.li({ key: index }, t(item));
                    })
                ),
                epilog.map(function (item, index) {
                    return React.DOM.p({ key: index }, t(item));
                })
            );
        }
    });

    var entries_EN = Immutable.fromJS([
        {
            title: "Company Incorporation",
            operations: [
                { account: 'Assets: Cash', debit: 1000 },
                { account: 'Equity: Common Stock', credit: 1000 }
            ],
            explanation: [
                "The company receives $1,000 in cash",
                "Shares worth of $1,000 belong to the founders",
                null,
                "The initial capital can be cash, but could also be intellectual property, goodwill from a previous company, licences, know how, etc…",
                "Sometimes, capital is not released immediately, accounts for \"capital to be released\" may be necessary."
            ],
            configuration: []
        }, {
            title: "Customer Invoice ($100 + 9% tax)",
            operations: [
                { account: 'Revenue: Goods', credit: 100 },
                { account: 'Liabilities: Deferred Tax Liabilities', credit: 9 },
                { account: 'Assets: Accounts Receivable', debit: 109 },
                { account: 'Assets: Inventory', credit: 50 },
                { account: 'Expenses: Cost of Goods Sold', debit: 50 }
            ],
            explanation: [
                "Revenues increase by $100",
                "A tax to pay at the end of the month of $9",
                "The customer owes $109",
                "The inventory is decreased by $50 (shipping of the goods)",
                "The cost of goods sold decreases the gross profit by $50"
            ],
            configuration: [
                "Revenue: defined on the product, or the product category if not on the product, field Income Account",
                "Deferred Tax Liabilities: defined on the tax used on the invoice line",
                "Accounts Receivable: defined on the customer (property)",
                "Inventory: defined on the category of the related product (property)",
                "Expenses: defined on the product, or the category of product (property)",
                null,
                "The fiscal position used on the invoice may have a rule that replaces the Income Account or the tax defined on the product by another one."
            ]
        }, {
            title: "Customer payment",
            operations: [
                { account: 'Assets: Cash', debit: 109 },
                { account: 'Assets: Accounts Receivable', credit: 109 }
            ],
            explanation: [
                "The company receives $109 in cash",
                "The receivable held against the client is reduced by $109"
            ],
            configuration: [
                "Cash: defined on the journal used when registering the payment, fields Default Credit Account and Default Debit Account",
                "Accounts Receivable: defined on the customer (property)"
            ]
        }, {
            title: "Supplier Bill (Purchase Order $50 but Invoice $52)",
            operations: [
                { account: 'Assets: Uninvoiced Inventory', debit: 50 },
                { account: 'Assets: Deferred Tax Assets', debit: 4.68 },
                { account: 'Expenses: Price Difference', debit: 2 },
                { account: 'Liabilities: Accounts Payable', credit: 56.68 }
            ],
            explanation: [
                "A temporary account is used to note goods to receive",
                "The purchase order provides prices of goods, the actual invoice may include extra costs such as shipping",
                "The company still needs to pay the vendor (traded an asset against a liability)"
            ],
            configuration: [
                "Uninvoiced Inventory: defined on the product or the category of related product, field: Stock Input Account",
                "Deferred Tax Assets: defined on the tax used on the purchase order line",
                "Accounts Payable: defined on the supplier related to the bill",
                null,
                "In this scenario, the purchase order was $50 but the company received an invoice for $52 as there were extra shipping costs"
            ]
        }, {
            title: "Supplier Goods Received (Purchase Order: $50)",
            operations: [
                { account: 'Assets: Inventory', debit: 50 },
                { account: 'Assets: Uninvoiced Inventory', credit: 50 },
            ],
            explanation: [
                "Inventory is increased by $50, the expected amount coming from the purchase order",
                "A temporary account is used for the counterpart and will be cleared when receiving the invoice"
            ],
            configuration: [
                "Uninvoiced Inventory: defined on the product or the category of related product, field: Stock Input Account",
                "Inventory: defined on the product category, field: Stock Valuation"
            ]
        }, {
            title: "Buy an asset ($300,000 - no tax)",
            operations: [
                { account: 'Assets: Buildings', debit: 300000 },
                { account: 'Liabilities: Accounts Payable', credit: 300000 }
            ],
            explanation: [
                "The company gets an asset worth of $300,000",
                "The company needs to pay $300,000 to the vendor (traded an asset against a liability)"
            ],
            configuration: [
                "Buildings: Defined on the Asset category selected on the supplier bill line",
                "Accounts Payable: defined on the supplier related to the bill (property)"
            ]
        }, {
            title: "Pay supplier invoice",
            operations: [
                { account: 'Liabilities: Accounts Payable', debit: 300000 },
                { account: 'Assets: Cash', credit: 300000 }
            ],
            explanation: [
                "The company owns $300,000 less to the supplier (liabilities are settled)",
                "The company's cash is reduced by $300,000 (reduction of asset)"
            ],
            configuration: [
                "Accounts Payable: defined on the supplier you pay (property)",
                "Cash: defined on the journal related to the payment method"
            ]
        }, {
            title: "Cash sale (Sales Receipt)",
            operations: [
                { account: 'Assets: Cash', debit: 109 },
                { account: 'Revenue: Goods', credit: 100 },
                { account: 'Liabilities: Deferred Tax Liabilities', credit: 9 }
            ],
            explanation: [
                "Company's cash is increased by $109",
                "Revenues increase by $100",
                "A tax of $9 has to be paid"
            ],
            configuration: [
                "Cash: Payment method defined on the Sales Receipt",
                "Sales: Defined on the product used in the sales receipt, or the category of product if empty",
                "Deferred Tax Liabilities: Defined on the tax used in the sales receipt (coming from the product)"
            ]
        }, {
            title: "Customer pays invoice, 5% early payment rebate",
            operations: [
                { account: 'Assets: Cash', debit: 950 },
                { account: 'Revenue: Sales Discount', debit: 50 },
                { account: 'Assets: Accounts Receivable', credit: 1000 }
            ],
            explanation: [
                "Company's cash is increased by $950",
                "Sales discounts lowering effective revenues by $50",
                "The customer owns $1000 less to the company"
            ],
            configuration: [
                "Cash: is defined on the journal related to the payment / bank statement",
                "Sales Discount: is selected during the payment matching process",
                "Accounts Receivable: is defined on the customer associated to the payment"
            ]
        }, {
            title: "Fiscal year closing — positive earnings and 50% dividends",
            operations: [
                { account: 'Net Profit', debit: 1000 },
                { account: 'Equity: Retained Earnings', credit: 500 },
                { account: 'Liabilities: Dividend Payable', credit: 500 }
            ],
            explanation: [
                "The P&L is cleared (net profit)",
                "50% is transferred to retained earnings",
                "50% will be paid to shareholders as dividends"
            ],
            configuration: [
                "This transaction is recorded by the advisor before closing the fiscal year, depending on how the company uses its net profit."
            ]
        }
    ]);
    var entries_BG = Immutable.fromJS([
        {
            title: "Учредяване на дружество",
            operations: [
                { account: 'Активи: Разплащателна сметка', debit: 1000 },
                { account: 'Собствен капитал: Основен капитал', credit: 1000 }
            ],
            explanation: [
                "Дружеството получава 1000 лв. по банковата сметка",
                "Дялове на стойност 1000 лв. принадлежат на учредителите",
                null,
                "Началният капитал може да е парични средства, но и интелектуална собственост, репутация, лицензи, ноу-хау и т.н.…",
                "Понякога капиталът не се внася веднага — възможни са сметки за вземания по записани вноски (сметка 426)."
            ],
            configuration: []
        }, {
            title: "Фактура към клиент (стоки 100 лв. + 20% ДДС)",
            operations: [
                { account: 'Приходи: Приходи от продажби на стоки', credit: 100 },
                { account: 'Пасиви: ДДС на продажбите', credit: 20 },
                { account: 'Активи: Вземания от клиенти', debit: 120 },
                { account: 'Активи: Стоки', credit: 50 },
                { account: 'Разходи: Отчетна стойност на продадените стоки', debit: 50 }
            ],
            explanation: [
                "Приходите се увеличават със 100 лв.",
                "ДДС за внасяне в края на периода — 20 лв.",
                "Клиентът дължи 120 лв.",
                "Материалните запаси намаляват с 50 лв. (експедиция на стоките)",
                "Отчетната стойност на продаденото намалява брутния марж с 50 лв."
            ],
            configuration: [
                "Приход (702): задава се върху продукта или продуктовата категория — поле „Приходна сметка“",
                "ДДС на продажбите (4532): от данъка на реда от фактурата",
                "Вземания от клиенти (411): от клиента (property)",
                "Стоки (304): от категорията на свързания продукт (property)",
                "Отчетна стойност (702.100): от продукта или категорията на продукта (property)",
                null,
                "Фискалната позиция на фактурата може да замени приходната сметка или данъка от продукта."
            ]
        }, {
            title: "Плащане от клиент",
            operations: [
                { account: 'Активи: Разплащателна сметка', debit: 120 },
                { account: 'Активи: Вземания от клиенти', credit: 120 }
            ],
            explanation: [
                "Дружеството получава 120 лв. по сметката",
                "Вземането от клиента намалява със 120 лв."
            ],
            configuration: [
                "Разплащателна сметка (503): от дневника при регистриране на плащането",
                "Вземания от клиенти (411): от клиента (property)"
            ]
        }, {
            title: "Фактура от доставчик (поръчка 50 лв., но фактура 52 лв.)",
            operations: [
                { account: 'Активи: Доставки (получени нефактурирани)', debit: 50 },
                { account: 'Активи: ДДС на покупките', debit: 10.40 },
                { account: 'Разходи: Ценови разлики при доставки', debit: 2 },
                { account: 'Пасиви: Задължения към доставчици', credit: 62.40 }
            ],
            explanation: [
                "Временна сметка отразява получените стоки за фактуриране",
                "Поръчката дава цените, а фактурата може да включва допълнителни разходи (напр. транспорт)",
                "Дружеството дължи плащане на доставчика (заменен е актив срещу пасив)"
            ],
            configuration: [
                "Доставки (301): от продукта или категорията — поле „Складова входяща сметка“",
                "ДДС на покупките (4531): от данъка на реда от поръчката",
                "Задължения към доставчици (401): от доставчика по фактурата",
                null,
                "Тук поръчката е 50 лв., но фактурата е 52 лв. поради допълнителни транспортни разходи"
            ]
        }, {
            title: "Получени стоки от доставчик (по поръчка: 50 лв.)",
            operations: [
                { account: 'Активи: Стоки', debit: 50 },
                { account: 'Активи: Доставки (получени нефактурирани)', credit: 50 }
            ],
            explanation: [
                "Материалните запаси нарастват с 50 лв. — очакваната сума по поръчката",
                "Временната сметка се ползва за насрещната страна и се закрива при фактурата"
            ],
            configuration: [
                "Доставки (301): от продукта или категорията — поле „Складова входяща сметка“",
                "Стоки (304): от продуктовата категория — поле „Складова оценка“"
            ]
        }, {
            title: "Покупка на актив (300000 лв. — без данък)",
            operations: [
                { account: 'Активи: Сгради и конструкции', debit: 300000 },
                { account: 'Пасиви: Задължения към доставчици', credit: 300000 }
            ],
            explanation: [
                "Дружеството придобива актив на стойност 300000 лв.",
                "Дружеството дължи 300000 лв. на доставчика (актив срещу пасив)"
            ],
            configuration: [
                "Сгради (202): от категорията актив на реда от фактурата",
                "Задължения към доставчици (401): от доставчика (property)"
            ]
        }, {
            title: "Плащане на фактура към доставчик",
            operations: [
                { account: 'Пасиви: Задължения към доставчици', debit: 300000 },
                { account: 'Активи: Разплащателна сметка', credit: 300000 }
            ],
            explanation: [
                "Дружеството дължи 300000 лв. по-малко (пасивите се погасяват)",
                "Паричните средства намаляват с 300000 лв. (намаление на актив)"
            ],
            configuration: [
                "Задължения към доставчици (401): от доставчика, на когото плащате (property)",
                "Разплащателна сметка (503): от дневника на метода на плащане"
            ]
        }, {
            title: "Продажба в брой (касова бележка)",
            operations: [
                { account: 'Активи: Каса', debit: 120 },
                { account: 'Приходи: Приходи от продажби на стоки', credit: 100 },
                { account: 'Пасиви: ДДС на продажбите', credit: 20 }
            ],
            explanation: [
                "Касовата наличност нараства със 120 лв.",
                "Приходите се увеличават със 100 лв.",
                "Дължи се ДДС от 20 лв."
            ],
            configuration: [
                "Каса (501): метод на плащане от касовата бележка (фискално устройство)",
                "Приходи (702): от продукта в касовата бележка или категорията",
                "ДДС на продажбите (4532): от данъка в касовата бележка"
            ]
        }, {
            title: "Клиент плаща с 5% отстъпка за ранно плащане",
            operations: [
                { account: 'Активи: Разплащателна сметка', debit: 950 },
                { account: 'Разходи: Други финансови разходи', debit: 50 },
                { account: 'Активи: Вземания от клиенти', credit: 1000 }
            ],
            explanation: [
                "Паричните средства нарастват с 950 лв.",
                "Отстъпката за ранно плащане е финансов разход от 50 лв.",
                "Клиентът дължи 1000 лв. по-малко"
            ],
            configuration: [
                "Разплащателна сметка (503): от дневника на плащането / банковото извлечение",
                "Други финансови разходи (629): сметка за отстъпката при ранно плащане",
                "Вземания от клиенти (411): от клиента по плащането",
                null,
                "В BG отстъпката за ранно плащане е финансов разход (629), БЕЗ корекция на ДДС основа."
            ]
        }, {
            title: "Приключване на годината — печалба и 50% дивиденти",
            operations: [
                { account: 'Печалба и загуба от текущата година', debit: 1000 },
                { account: 'Собствен капитал: Неразпределена печалба', credit: 500 },
                { account: 'Пасиви: Задължения за дивиденти', credit: 500 }
            ],
            explanation: [
                "Финансовият резултат (123) се закрива (нетна печалба)",
                "50% се отнасят към неразпределена печалба (122)",
                "50% ще се изплатят на собствениците като дивиденти (425)"
            ],
            configuration: [
                "Операцията се осчетоводява от експерта преди приключване на годината, според това как дружеството използва печалбата си."
            ]
        }
    ]);
    var entries = isBG ? entries_BG : entries_EN;
}());
