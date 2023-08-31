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

activate :social_image

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
        return '<div class="box ' + dataset + '" data-visibillity="y" data-up="' + up + '" data-down="' + down.to_s + '" style="left:' + down.to_s + 'em;width:' + width.to_s + 'em;"><span>' + name + '</span></div>'
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
