/* =============================================================================
   FUNNEL LOGIC — Vanilla JS
   Handles URL param passing, lane switching, result variants, form submission,
   and Google Analytics event tracking.
   ============================================================================= */

(function () {
    'use strict';

    // -------------------------------------------------------------------------
    // URL Parameter Helpers
    // -------------------------------------------------------------------------

    function getParams() {
        return Object.fromEntries(new URLSearchParams(window.location.search));
    }

    function buildUrl(base, extraParams) {
        var params = Object.assign({}, getParams(), extraParams || {});
        var qs = Object.keys(params)
            .filter(function (k) { return params[k] !== undefined && params[k] !== ''; })
            .map(function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]); })
            .join('&');
        return base + (qs ? '?' + qs : '');
    }

    // -------------------------------------------------------------------------
    // Analytics
    // -------------------------------------------------------------------------

    function trackStep(eventName, data) {
        if (typeof gtag === 'function') {
            gtag('event', eventName, data);
        }
    }

    // -------------------------------------------------------------------------
    // Direct-Entry Redirect (Funnel A)
    // -------------------------------------------------------------------------

    function handleDirectEntry() {
        var params = getParams();
        if (params.plan) {
            var redirectUrl = buildUrl('/funnel/a/result/', {
                tier: params.plan,
                entry: 'direct'
            });
            window.location.replace(redirectUrl);
        }
    }

    // -------------------------------------------------------------------------
    // Option Buttons — inject params into hrefs
    // -------------------------------------------------------------------------

    function initOptionButtons() {
        var buttons = document.querySelectorAll('.funnel-option-btn[data-params]');
        var currentParams = getParams();

        buttons.forEach(function (btn) {
            var base = btn.getAttribute('href').split('?')[0];
            var btnParams = {};

            try {
                btnParams = JSON.parse(btn.getAttribute('data-params'));
            } catch (e) { /* ignore */ }

            // Merge current params + button params
            var merged = Object.assign({}, currentParams, btnParams);
            btn.setAttribute('href', buildUrl(base, merged));

            // Track click
            btn.addEventListener('click', function () {
                var main = document.querySelector('.funnel-content');
                trackStep('funnel_step', {
                    funnel_id: main ? main.dataset.funnelId : '',
                    step_name: main ? main.dataset.stepName : '',
                    step_number: main ? parseInt(main.dataset.stepNumber, 10) : 0,
                    selection: btn.getAttribute('data-value') || ''
                });
            });
        });
    }

    // -------------------------------------------------------------------------
    // Lane Switching (Funnel A Q2)
    // -------------------------------------------------------------------------

    function initLanes() {
        var params = getParams();
        var lane = params.lane;
        if (!lane) return;

        var lanes = document.querySelectorAll('.funnel-lane');
        lanes.forEach(function (el) {
            if (el.dataset.lane === lane) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });
    }

    // -------------------------------------------------------------------------
    // Result Variants (Funnel A Result)
    // -------------------------------------------------------------------------

    function initResultVariants() {
        var params = getParams();
        var tier = params.tier;
        if (!tier) return;

        var variants = document.querySelectorAll('.funnel-result-variant');
        variants.forEach(function (el) {
            if (el.dataset.tier === tier) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });

        // Update CTA links with accumulated params
        var ctaLinks = document.querySelectorAll('.funnel-result-cta');
        ctaLinks.forEach(function (link) {
            var base = link.getAttribute('href').split('?')[0];
            link.setAttribute('href', buildUrl(base, params));
        });
    }

    // -------------------------------------------------------------------------
    // Checkbox Step (Funnel B compliance)
    // -------------------------------------------------------------------------

    function initCheckboxStep() {
        var container = document.querySelector('.funnel-checkbox-options');
        if (!container) return;

        var labels = container.querySelectorAll('.funnel-checkbox-label');
        labels.forEach(function (label) {
            var cb = label.querySelector('input[type="checkbox"]');
            if (cb) {
                cb.addEventListener('change', function () {
                    label.classList.toggle('checked', cb.checked);
                });
            }
        });

        var nextBtn = document.querySelector('.funnel-checkbox-next');
        if (nextBtn) {
            nextBtn.addEventListener('click', function (e) {
                e.preventDefault();
                var checked = container.querySelectorAll('input[type="checkbox"]:checked');
                var values = [];
                checked.forEach(function (cb) { values.push(cb.value); });
                var complianceValue = values.length > 0 ? values.join(',') : 'none';

                var base = nextBtn.getAttribute('href').split('?')[0];
                var url = buildUrl(base, { compliance: complianceValue });

                trackStep('funnel_step', {
                    funnel_id: 'b',
                    step_name: 'q3_compliance',
                    step_number: 3,
                    selection: complianceValue
                });

                window.location.href = url;
            });
        }
    }

    // -------------------------------------------------------------------------
    // Form Submission (Google Apps Script / generic endpoint)
    // -------------------------------------------------------------------------

    function initFormSubmission() {
        var form = document.querySelector('.funnel-form[data-action]');
        if (!form) return;

        var params = getParams();

        // Populate hidden fields with URL params
        var hiddenContainer = form.querySelector('.funnel-hidden-fields');
        if (hiddenContainer) {
            Object.keys(params).forEach(function (key) {
                var input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = params[key];
                hiddenContainer.appendChild(input);
            });
        }

        // Also populate visible text that references the tier
        var tierLabels = document.querySelectorAll('.funnel-tier-label');
        var tierNames = {
            starter: 'Starter',
            professional: 'Professional',
            business: 'Business',
            enterprise: 'Enterprise'
        };
        tierLabels.forEach(function (el) {
            if (params.tier && tierNames[params.tier]) {
                el.textContent = tierNames[params.tier];
            }
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var submitBtn = form.querySelector('.funnel-submit-btn');
            var errorEl = form.querySelector('.funnel-form-error');
            var actionUrl = form.getAttribute('data-action');

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }
            if (errorEl) errorEl.style.display = 'none';

            // Collect all form data as FormData (multipart/form-data).
            // IMPORTANT: Do NOT set Content-Type or other custom headers.
            // FormData with POST is a "simple request" — the browser skips
            // the CORS preflight and follows Google's 302 redirect. The
            // final response from script.googleusercontent.com includes
            // Access-Control-Allow-Origin: * so we can read the JSON body.
            var formData = new FormData(form);

            fetch(actionUrl, {
                method: 'POST',
                body: formData
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                if (result.status === 'success') {
                    var main = document.querySelector('.funnel-content');
                    trackStep('funnel_complete', {
                        funnel_id: main ? main.dataset.funnelId : '',
                        tier: params.tier || '',
                        tags: Object.keys(params).map(function (k) { return k + ':' + params[k]; }).join(',')
                    });

                    var redirectUrl = form.getAttribute('data-redirect');
                    if (redirectUrl) {
                        window.location.href = buildUrl(redirectUrl, params);
                    }
                } else {
                    throw new Error(result.message || 'Submission failed');
                }
            })
            .catch(function (err) {
                if (errorEl) {
                    errorEl.textContent = 'Something went wrong. Please try again.';
                    errorEl.style.display = 'block';
                }
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = submitBtn.getAttribute('data-original-text') || 'Submit';
                }
            });
        });
    }

    // -------------------------------------------------------------------------
    // Init
    // -------------------------------------------------------------------------

    document.addEventListener('DOMContentLoaded', function () {
        // Track page view as funnel step
        var main = document.querySelector('.funnel-content');
        if (main && main.dataset.stepName) {
            trackStep('funnel_step_view', {
                funnel_id: main.dataset.funnelId || '',
                step_name: main.dataset.stepName || '',
                step_number: parseInt(main.dataset.stepNumber, 10) || 0
            });

            // Funnel B: fire funnel_complete and POST qualification data when
            // user reaches the booking page (no form — booking happens on Google's side)
            if (main.dataset.funnelId === 'b' && main.dataset.stepName === 'book_form') {
                var params = getParams();
                trackStep('funnel_complete', {
                    funnel_id: 'b',
                    tier: '',
                    tags: Object.keys(params).map(function (k) { return k + ':' + params[k]; }).join(',')
                });

                // Send qualification data to Google Apps Script (fire-and-forget)
                var urlParams = new URLSearchParams(window.location.search);
                var formData = new FormData();
                formData.append('challenge', urlParams.get('challenge') || '');
                formData.append('apps', urlParams.get('apps') || '');
                formData.append('compliance', urlParams.get('compliance') || '');
                formData.append('timeline', urlParams.get('timeline') || '');

                fetch('https://script.google.com/macros/s/AKfycbxA8aAHD1v6SP0bFWQLSIZr6Utity0g7cQeWhe95MyPrJFfY0DDHQz73gCv6t3McqTLwg/exec', {
                    method: 'POST',
                    body: formData
                });
            }
        }

        // Check for direct entry (Funnel A only)
        if (main && main.dataset.stepName === 'q1_situation') {
            handleDirectEntry();
        }

        initOptionButtons();
        initLanes();
        initResultVariants();
        initCheckboxStep();
        initFormSubmission();
    });

})();
