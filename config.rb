# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

# Use '#id' and '.classname' as div shortcuts in slim
# http://slim-lang.com/
Slim::Engine.set_options shortcut: {
    '#' => { tag: 'div', attr: 'id' },
    '.' => { tag: 'div', attr: 'class' }
}


# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.ruby-version', layout: false
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.csv', layout: false
page '/*.txt', layout: false
page "/partials/*", layout: false

# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

# pretty urls
activate :directory_indexes
activate :minify_html
activate :social_image do |social_image|
    social_image.window_size = '1200,600' # The size of the screenshot
    social_image.selector = 'body > *' # Used to test that the social image url has loaded properly. The more specific this is, the better the chance of catching errors.
    social_image.base_url = 'https://wkwkrnht.github.io/BandPlanVisualize/' # When building the site, fetch against this URL.
end

helpers do
    # Helpers
    # Methods defined in the helpers block are available in templates
    # https://middlemanapp.com/basics/helper-methods/

    def update_max(target = 0, chaser = 0)
        if chaser > target
            return chaser
        elsif target > chaser
            return target
        elsif chaser === target
            return target
        else
            return target
        end
    end

    def write_box(dataset, name, down, up)
        width = up.to_i - down.to_i
        return '<div class="box ' + dataset + '" data-visibillity="y" data-up="' + up.to_s + '" data-down="' + down.to_s + '" style="left:' + down.to_s + 'em;width:' + width.to_s + 'em;"><span>' + dataset + ' ' + name + '</span></div>'
    end

    def write_elements()
        i = 0
        html = ''
        array = []

        CSV.foreach('./data/JPBandPlan.csv', headers: true) do |row|
            array[i] = ['JP', row[0], row['down'], row['up']]
            i += 1
        end

        CSV.foreach('./data/ISMBandPlan.csv', headers: true) do |row|
            array[i] = ['ISM', row[0], row['Down'], row['Up']]
            i += 1
        end

        CSV.foreach('./data/ETSIBandPlan.csv', headers: true) do |row|
            array[i] = ['ETSI', row[0], row['Down'], row['Up']]
            i += 1
        end

        CSV.foreach('./data/IEEE802154BandPlan.csv', headers: true) do |row|
            array[i] = ['IEEE802154', row[0], row['Down'], row['Up']]
            i += 1
        end

        CSV.foreach('./data/BTBandPlan.csv', headers: true) do |row|
            array[i] = ['BT', row[0], row['Down'], row['Up']]
            i += 1
        end

        CSV.foreach('./data/DECTBandPlan.csv', headers: true) do |row|
            array[i] = ['DECT', row[0], row['Down'], row['Up']]
            i += 1
        end

        CSV.foreach('./data/ISDBTBandPlan.csv', headers: true) do |row|
            array[i] = ['ISDBT', row[0], row['Down'], row['Up']]
            i += 1
        end

        CSV.foreach('./data/BSBandPlan.csv', headers: true) do |row|
            array[i] = ['BS', row[0], row['Down'], row['Up']]
            i += 1
        end

        CSV.foreach('./data/Wi-FiBandPlan.csv', headers: true) do |row|
            array[i] = ['WiFi', row[0], row['Down'], row['Up']]
            i += 1
        end

        CSV.foreach('./data/NTTBandPlan.csv', headers: true) do |row|
            dataset = 'NTT'
            mode = row['Mode']

            case mode
            when 'FDD'
                name0 = row[0] + '↑'
                name1 = row[0] + '↓'
                array[i] = [dataset, name0, row['ULdown'], row['ULup']]
                i += 1
                array[i] = [dataset, name1, row['DLdown'], row['DLup']]
                i += 1
            when 'TDD'
                name = row[0] + '↑↓'
                array[i] = [dataset, name, row['DLdown'], row['DLup']]
                i += 1
            when 'SUL'
                name = row[0] + '↑'
                array[i] = [dataset, name, row['ULdown'], row['ULup']]
                i += 1
            when 'SDL'
                name = row[0] + '↓'
                array[i] = [dataset, name, row['DLdown'], row['DLup']]
                i += 1
            end
        end

        CSV.foreach('./data/KDDIBandPlan.csv', headers: true) do |row|
            dataset = 'KDDI'
            mode = row['Mode']

            case mode
            when 'FDD'
                name0 = row[0] + '↑'
                name1 = row[0] + '↓'
                array[i] = [dataset, name0, row['ULdown'], row['ULup']]
                i += 1
                array[i] = [dataset, name1, row['DLdown'], row['DLup']]
                i += 1
            when 'TDD'
                name = row[0] + '↑↓'
                array[i] = [dataset, name, row['DLdown'], row['DLup']]
                i += 1
            when 'SUL'
                name = row[0] + '↑'
                array[i] = [dataset, name, row['ULdown'], row['ULup']]
                i += 1
            when 'SDL'
                name = row[0] + '↓'
                array[i] = [dataset, name, row['DLdown'], row['DLup']]
                i += 1
            end
        end

        CSV.foreach('./data/SBBandPlan.csv', headers: true) do |row|
            dataset = 'SB'
            mode = row['Mode']

            case mode
            when 'FDD'
                name0 = row[0] + '↑'
                name1 = row[0] + '↓'
                array[i] = [dataset, name0, row['ULdown'], row['ULup']]
                i += 1
                array[i] = [dataset, name1, row['DLdown'], row['DLup']]
                i += 1
            when 'TDD'
                name = row[0] + '↑↓'
                array[i] = [dataset, name, row['DLdown'], row['DLup']]
                i += 1
            when 'SUL'
                name = row[0] + '↑'
                array[i] = [dataset, name, row['ULdown'], row['ULup']]
                i += 1
            when 'SDL'
                name = row[0] + '↓'
                array[i] = [dataset, name, row['DLdown'], row['DLup']]
                i += 1
            end
        end

        CSV.foreach('./data/RMBandPlan.csv', headers: true) do |row|
            dataset = 'RM'
            mode = row['Mode']

            case mode
            when 'FDD'
                name0 = row[0] + '↑'
                name1 = row[0] + '↓'
                array[i] = [dataset, name0, row['ULdown'], row['ULup']]
                i += 1
                array[i] = [dataset, name1, row['DLdown'], row['DLup']]
                i += 1
            when 'TDD'
                name = row[0] + '↑↓'
                array[i] = [dataset, name, row['DLdown'], row['DLup']]
                i += 1
            when 'SUL'
                name = row[0] + '↑'
                array[i] = [dataset, name, row['ULdown'], row['ULup']]
                i += 1
            when 'SDL'
                name = row[0] + '↓'
                array[i] = [dataset, name, row['DLdown'], row['DLup']]
                i += 1
            end
        end

        CSV.foreach('./data/3GPPBandPlan.csv', headers: true) do |row|
            dataset = '3GPP'
            mode = row['Mode']

            case mode
            when 'FDD'
                name0 = row[0] + '↑'
                name1 = row[0] + '↓'
                array[i] = [dataset, name0, row['ULdown'], row['ULup']]
                i += 1
                array[i] = [dataset, name1, row['DLdown'], row['DLup']]
                i += 1
            when 'TDD'
                name = row[0] + '↑↓'
                array[i] = [dataset, name, row['DLdown'], row['DLup']]
                i += 1
            when 'SUL'
                name = row[0] + '↑'
                array[i] = [dataset, name, row['ULdown'], row['ULup']]
                i += 1
            when 'SDL'
                name = row[0] + '↓'
                array[i] = [dataset, name, row['DLdown'], row['DLup']]
                i += 1
            end
        end

        array.sort_by{| x | x[3].to_i }

        html += write_ruler(array.last[3].to_i)
        array.each do |item|
            html += write_box(item[0], item[1], item[2], item[3])
        end

        return html
    end

    def write_ruler(area_size = 0)
        freq = 0
        unit = 500
        times = area_size.div(unit)
        html = ''

        until freq > times
            temp = (freq * unit).to_s

            html += '<div class="ruler" style="left:' + temp + 'px;"><span>' + temp + '</span></div>'

            freq += 1
        end

        return html
    end
end

configure :build do
    # Build-specific configuration
    # https://middlemanapp.com/advanced/configuration/#environment-specific-settings

    # Generate relative paths to the repo when deploying to GitHub Pages
    config[:http_prefix] = '/BandPlanVisualize'

    # Minify css on build
    activate :minify_css

    # Use Gzip
    activate :gzip
end