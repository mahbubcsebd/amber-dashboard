$(document).ready(function () {
    // ---------------------------- Feather Icons Start ----------------------------
    feather.replace();
    // ---------------------------- Feather Icons End ------------------------------

    // ---------------------------- Sidebar Start ----------------------------
    // Hide all lists initially
    $('.sidebar-link-list').hide();
    $('#sidebar-show-btn').on('click', function () {
        $('.dashboard-sidebar').toggle('fast');
    });

    // Open the active item after the DOM is fully loaded
    setTimeout(() => {
        $('.sidebar-menu-item.active .sidebar-link-list').slideDown('fast');
    }, 0);

    // Add click event handler for toggle buttons
    $('.sidebar-menu-toggle-btn').on('click', function () {
        const parentItem = $(this).closest('.sidebar-menu-item'); // Get the parent `li`
        const targetList = parentItem.find('.sidebar-link-list'); // Get the associated list

        // Check if this item is already active
        if (parentItem.hasClass('active')) {
            parentItem.removeClass('active');
            targetList.slideUp('fast');
        } else {
            // Close all lists and remove 'active' class
            $('.sidebar-menu-item').removeClass('active');
            $('.sidebar-link-list').slideUp('fast');

            // Open the clicked item and add 'active' class
            parentItem.addClass('active');
            targetList.slideDown('fast');
        }
    });

    $('#sidebar-toggle-btn').on('click', function () {
        $('#website-logo').toggle('fast', function () {
            $('.header-logo-wrapper').toggleClass('sidebar-logo-active');
            $('.dashboard-sidebar').toggle('fast');
        });

        // Toggle icon
        const icon = $('#sidebar-toggle-btn i');
        if (icon.hasClass('fa-angles-left')) {
            icon.removeClass('fa-angles-left').addClass('fa-angles-right');
        } else {
            icon.removeClass('fa-angles-right').addClass('fa-angles-left');
        }
    });
    // ---------------------------- Sidebar End ----------------------------

    // ---------------------------- DataTable Start ----------------------------
    $(document).ready(function () {
        // Initialize DataTable without pagination buttons in DOM
        var table = $('#all-product-list-data-table').DataTable({
            dom: 'rt', // Only show table, no pagination controls
            pageLength: 10, // Number of rows per page
            language: {
                info: 'Showing entries _START_ to _END_ of _TOTAL_',
                infoEmpty: 'Showing entries 0 to 0 of 0',
                infoFiltered: '(filtered from _MAX_ total entries)',
            },
        });

        // Handle Previous button click
        $('#table-prev').on('click', function () {
            if (!$(this).prop('disabled')) {
                table.page('previous').draw('page');
            }
        });

        // Handle Next button click
        $('#table-next').on('click', function () {
            if (!$(this).prop('disabled')) {
                table.page('next').draw('page');
            }
        });

        // Function to update showing entries text and button states
        function updatePaginationInfo() {
            var pageInfo = table.page.info();

            // Update showing entries text
            var showingText =
                'Showing entries ' +
                (pageInfo.start + 1) +
                ' to ' +
                pageInfo.end +
                ' of ' +
                pageInfo.recordsTotal;
            $('#showing-number').text(showingText);

            // Update Previous button state
            $('#table-prev').prop('disabled', !pageInfo.page);

            // Update Next button state
            $('#table-next').prop(
                'disabled',
                pageInfo.page >= pageInfo.pages - 1
            );
        }

        // Update pagination info on page change
        table.on('page.dt draw.dt', updatePaginationInfo);

        // Initial update
        updatePaginationInfo();
        // Attach buttons to your custom elements
        $('#btn-copy').on('click', function () {
            table.button('.buttons-copy').trigger();
        });

        $('#btn-csv').on('click', function () {
            table.button('.buttons-csv').trigger();
        });

        $('#btn-excel').on('click', function () {
            table.button('.buttons-excel').trigger();
        });

        $('#btn-pdf').on('click', function () {
            table.button('.buttons-pdf').trigger();
        });

        $('#btn-print').on('click', function () {
            table.button('.buttons-print').trigger();
        });

        // Add event listener to custom search box
        $('#product-table-search').on('keyup', function () {
            table.search(this.value).draw(); // Use the search() method of DataTable
        });

        // Handle "select all" checkbox click
        $('#select-all').on('click', function () {
            var isChecked = $(this).is(':checked');
            $('.row-checkbox').prop('checked', isChecked);
        });

        // Handle row checkbox click
        $('#all-product-list-data-table tbody').on(
            'change',
            '.row-checkbox',
            function () {
                var totalCheckboxes = $('.row-checkbox').length;
                var checkedCheckboxes = $('.row-checkbox:checked').length;
                $('#select-all').prop(
                    'checked',
                    totalCheckboxes === checkedCheckboxes
                );
            }
        );

        // Handle dropdown toggle for three-dot menu
        $('#all-product-list-data-table tbody').on(
            'click',
            '.three-dot-menu',
            function (e) {
                e.stopPropagation();
                $('.dropdown-menu')
                    .not($(this).siblings('.dropdown-menu'))
                    .removeClass('show');
                $(this).siblings('.dropdown-menu').toggleClass('show');
            }
        );

        // Close dropdown when clicking outside
        $(document).on('click', function (e) {
            if (!$(e.target).closest('.dropdown').length) {
                $('.dropdown-menu').removeClass('show');
            }
        });
    });

    // ---------------------------- DataTable End ----------------------------

    // Chart js
    const ctx = document.getElementById('severityLineChart').getContext('2d');

    // Initial chart data for "By Month"
    const chartData = {
        month: {
            labels: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
            ],
            datasets: [
                {
                    label: 'Critical | X: Dec | Y: 964',
                    data: [
                        300, 320, 310, 350, 390, 400, 380, 420, 450, 500, 550,
                        964,
                    ],
                    borderColor: '#FF5959',
                    backgroundColor: '#FF5959',
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 0,
                    cubicInterpolationMode: 'monotone',
                },
                {
                    label: 'High | X: Dec | Y: 842',
                    data: [
                        200, 220, 240, 250, 260, 280, 300, 320, 340, 360, 380,
                        842,
                    ],
                    borderColor: '#F8910B ',
                    backgroundColor: '#F8910B ',
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 0,
                    cubicInterpolationMode: 'monotone',
                },
                {
                    label: 'Medium | X: Dec | Y: 89',
                    data: [100, 95, 85, 90, 100, 110, 105, 95, 100, 95, 90, 89],
                    borderColor: '#F9C80E',
                    backgroundColor: '#F9C80E',
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 0,
                    cubicInterpolationMode: 'monotone',
                },
                {
                    label: 'Low | X: Dec | Y: 0',
                    data: [20, 25, 30, 25, 20, 30, 35, 40, 45, 50, 55, 0],
                    borderColor: '#614DFF',
                    backgroundColor: '#614DFF',
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 0,
                    cubicInterpolationMode: 'monotone',
                },
            ],
        },
        week: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [
                {
                    label: 'Critical',
                    data: [500, 450, 480, 964],
                    borderColor: '#ff6b6b',
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 0,
                    cubicInterpolationMode: 'monotone',
                },
                {
                    label: 'High',
                    data: [400, 420, 410, 842],
                    borderColor: '#ffa94d',
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 0,
                    cubicInterpolationMode: 'monotone',
                },
                {
                    label: 'Medium',
                    data: [90, 80, 85, 89],
                    borderColor: '#ffd43b',
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 0,
                    cubicInterpolationMode: 'monotone',
                },
                {
                    label: 'Low',
                    data: [40, 45, 30, 0],
                    borderColor: '#748ffc',
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 0,
                    cubicInterpolationMode: 'monotone',
                },
            ],
        },
        day: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Critical',
                    data: [90, 100, 110, 120, 130, 140, 150],
                    borderColor: '#ff6b6b',
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 0,
                    cubicInterpolationMode: 'monotone',
                },
                {
                    label: 'High',
                    data: [80, 85, 90, 95, 100, 105, 110],
                    borderColor: '#ffa94d',
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 0,
                    cubicInterpolationMode: 'monotone',
                },
                {
                    label: 'Medium',
                    data: [20, 25, 30, 35, 40, 45, 50],
                    borderColor: '#ffd43b',
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 0,
                    cubicInterpolationMode: 'monotone',
                },
                {
                    label: 'Low',
                    data: [10, 15, 20, 25, 30, 35, 40],
                    borderColor: '#748ffc',
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 0,
                    cubicInterpolationMode: 'monotone',
                },
            ],
        },
    };

    // Create Chart.js instance
    let severityChart = new Chart(ctx, {
        type: 'line',
        data: chartData.month,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index',
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                    },
                },
                title: {
                    display: false,
                },
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#f0f0f0',
                    },
                },
            },
        },
    });

    // Update chart on selection change
    document
        .getElementById('timePeriodSelector')
        .addEventListener('change', (event) => {
            const selectedPeriod = event.target.value;
            severityChart.data = chartData[selectedPeriod];
            severityChart.update();
        });

    // Data for the chart
    const data = {
        labels: ['Critical', 'High', 'Medium', 'Low', 'Informational'],
        datasets: [
            {
                data: [1427, 888, 209, 159, 166],
                backgroundColor: [
                    '#FF5959', // Critical - Red
                    '#F8910B', // High - Orange
                    '#F9C80E', // Medium - Yellow
                    '#614DFF', // Low - Purple
                    '#EAECF0', // Informational - Gray
                ],
                borderWidth: 0,
                spacing: 2,
            },
        ],
    };

    // Create the chart
    const ctxTwo = document
        .getElementById('severityDonutChart')
        .getContext('2d');
    const chartTwo = new Chart(ctxTwo, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%',
            plugins: {
                legend: {
                    display: false, // Disable default legend
                },
            },
        },
    });

    // Create custom legend
    function createCustomLegend() {
        const legendContainer = document.getElementById('customLegend');
        legendContainer.innerHTML = ''; // Clear existing content

        data.labels.forEach((label, index) => {
            const item = document.createElement('div');
            item.className = 'legend-item';

            item.innerHTML = `
            <div class="legend-item-inner">
                <div class="legend-color" style="background-color: ${data.datasets[0].backgroundColor[index]}"></div>
                <span class="legend-label">${label}</span>
            </div>
            <span class="legend-value">${data.datasets[0].data[index]}</span>
        `;

            // Add click event listener to toggle data visibility and apply line-through
            item.addEventListener('click', () => {
                const dataset = chartTwo.data.datasets[0];

                // Toggle visibility of the data point
                dataset.data[index] =
                    dataset.data[index] === null ? originalData[index] : null;

                // Toggle line-through style
                const legendLabel = item.querySelector('.legend-label');
                if (dataset.data[index] === null) {
                    legendLabel.style.textDecoration = 'line-through'; // Add line-through
                    legendLabel.style.opacity = '0.6'; // Optional: Dim the text
                } else {
                    legendLabel.style.textDecoration = 'none'; // Remove line-through
                    legendLabel.style.opacity = '1'; // Reset opacity
                }

                // Redraw the chart
                chartTwo.update();
            });

            legendContainer.appendChild(item);
        });
    }

    // Save original data for toggling visibility
    const originalData = [...data.datasets[0].data];

    // Call the function to create the legend
    createCustomLegend();

    document.getElementById('filterData').addEventListener('click', () => {
        alert('Filter Data clicked! Implement filtering functionality here.');
        // Example: Prompt user for date range or severity level filters.
    });

    document.getElementById('exportData').addEventListener('click', () => {
        alert('Export Data clicked! Implement export functionality here.');
        // Example: Export the chart as an image or CSV.
        chartTwo.toBase64Image(); // Export chart as an image
    });

    document.getElementById('customizeChart').addEventListener('click', () => {
        alert(
            'Customize Chart clicked! Implement customization functionality here.'
        );
        // Example: Toggle chart options (e.g., show/hide data, change chart type).
        chartTwo.data.datasets[0].data = [100, 200, 300, 400, 500]; // Update data dynamically
        chartTwo.update();
    });

    document.getElementById('resetChart').addEventListener('click', () => {
        alert('Reset Chart clicked! Resetting to default view.');
        // Reset chart to original data
        chartTwo.data.datasets[0].data = [1427, 888, 209, 159, 166];
        chartTwo.update();
    });

    // Badge Tooltip
    var tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    tinymce.init({
        selector: '#editor',
        height: 600, // Adjust editor height
        plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'emoticons',
            'wordcount',
            'help',
            'quickbars',
            'directionality',
            'codesample',
            'pageembed',
            'nonbreaking',
            'save',
            'template',
            'visualchars',
            'textcolor',
        ],
        toolbar: `undo redo | fontselect fontsizeselect |
                      formatselect | bold italic underline strikethrough |
                      forecolor backcolor | alignleft aligncenter alignright alignjustify |
                      bullist numlist outdent indent | link image media table |
                      codesample blockquote | emoticons charmap |
                      preview fullscreen | help`,
        menubar: 'file edit view insert format tools table help', // Full menu bar
        content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',

        // Font family options
        font_family_formats: `
                Arial=arial,helvetica,sans-serif;
                Helvetica=helvetica;
                Times New Roman=times new roman,times,serif;
                Verdana=verdana,geneva,sans-serif;
                Courier New=courier new,courier,monospace;
                Comic Sans MS=comic sans ms,sans-serif;
                Georgia=georgia,serif;
                Tahoma=tahoma,arial,helvetica,sans-serif;
            `,

        // Font size options
        fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',

        // Quickbars and context menu
        quickbars_selection_toolbar:
            'bold italic | quicklink h1 h2 h3 h4 h5 h6 blockquote',
        quickbars_insert_toolbar: 'quickimage quicktable',
        contextmenu: 'link image inserttable | cell row column deletetable', // Context menu

        // Enable image upload handling
        images_upload_handler: function (blobInfo, success, failure) {
            const formData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());

            fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((result) => success(result.location)) // Use the returned URL
                .catch((error) =>
                    failure('Image upload failed: ' + error.message)
                );
        },
    });

    // Initialize Select2
    $('#tag-input').select2({
        tags: true, // Enable tagging
        tokenSeparators: [',', ' '], // Use comma or space to separate tags
        placeholder: 'Type and press Enter to add a tag',
        allowClear: true,
    });

    // Listen for new tag creation
    $('#tag-input').on('select2:select', function (e) {
        console.log('Selected tag:', e.params.data.text); // Optional: log the new tag
    });
});
