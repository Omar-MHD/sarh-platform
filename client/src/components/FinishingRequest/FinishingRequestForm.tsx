import React, { useState, useEffect } from 'react';
import './FinishingRequestForm.css';

interface ServiceItem {
  id: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  category: 'internal' | 'external';
}

const ALL_SERVICES: ServiceItem[] = [
  { 
    id: 'int-1', 
    category: 'internal', 
    titleAr: 'أعمال التمديدات الصحية', 
    titleEn: 'Plumbing Works', 
    descAr: 'تركيب شبكات المياه الحلوة، الصرف الصحي، وتجهيز الحمامات والمطابخ', 
    descEn: 'Installing freshwater, sewage networks, and preparing kitchens & bathrooms' 
  },
  { 
    id: 'int-2', 
    category: 'internal', 
    titleAr: 'أعمال التمديدات الكهربائية', 
    titleEn: 'Electrical Works', 
    descAr: 'تمديد الأسلاك، لوحات توزيع الكهرباء، المقابس، ومفاتيح الإنارة', 
    descEn: 'Wiring, distribution boards, sockets, and lighting switches' 
  },
  { 
    id: 'int-3', 
    category: 'internal', 
    titleAr: 'أعمال اللياسة (المحارة)', 
    titleEn: 'Plastering Works', 
    descAr: 'تغطية الجدران والأسقف بطبقة إسمنتية لتسويتها وإعدادها للدهان', 
    descEn: 'Covering walls and ceilings with cement layers to prepare for painting' 
  },
  { 
    id: 'int-4', 
    category: 'internal', 
    titleAr: 'الأسقف المستعارة والديكور', 
    titleEn: 'False Ceilings & Decor', 
    descAr: 'تركيب الجبس بورد، الديكورات الخشبية، والإنارة المخفية', 
    descEn: 'Installing gypsum board, wooden decorations, and hidden lighting' 
  },
  { 
    id: 'int-5', 
    category: 'internal', 
    titleAr: 'أعمال الأرضيات', 
    titleEn: 'Flooring Works', 
    descAr: 'تركيب البلاط، السيراميك، الرخام، الغرانيت، أو الباركيه', 
    descEn: 'Installing tiles, ceramic, marble, granite, or parquet' 
  },
  { 
    id: 'int-6', 
    category: 'internal', 
    titleAr: 'أعمال الدهانات', 
    titleEn: 'Painting Works', 
    descAr: 'طلاء الجدران والأسقف بالطبقات الأساسية والنهائية', 
    descEn: 'Painting walls and ceilings with primer and final coats' 
  },
  { 
    id: 'int-7', 
    category: 'internal', 
    titleAr: 'النجارة والألمنيوم الداخلية', 
    titleEn: 'Interior Carpentry & Aluminum', 
    descAr: 'تركيب الأبواب الداخلية، حواف الأبواب، والمطابخ', 
    descEn: 'Installing interior doors, door frames, and kitchens' 
  },
  { 
    id: 'ext-1', 
    category: 'external', 
    titleAr: 'إكساء الواجهات', 
    titleEn: 'Facade Cladding', 
    descAr: 'حجر طبيعي، رخام، حجر صناعي، أو دهانات خارجية مقاومة للرطوبة', 
    descEn: 'Natural stone, marble, artificial stone, or moisture-resistant paints' 
  },
  { 
    id: 'ext-2', 
    category: 'external', 
    titleAr: 'الألمنيوم والزجاج الخارجي', 
    titleEn: 'Exterior Glass & Aluminum', 
    descAr: 'النوافذ الخارجية، الواجهات الزجاجية (Curtain Walls)، والمداخل', 
    descEn: 'Exterior windows, curtain walls, and main entrances' 
  },
  { 
    id: 'ext-3', 
    category: 'external', 
    titleAr: 'أعمال العزل الشامل', 
    titleEn: 'Comprehensive Insulation', 
    descAr: 'عزل مائي للأسطح والحمامات وعزل حراري للجدران', 
    descEn: 'Waterproofing for roofs/bathrooms and thermal insulation for walls' 
  },
  { 
    id: 'ext-4', 
    category: 'external', 
    titleAr: 'الدرابزينات والحمايات', 
    titleEn: 'Railings & Protections', 
    descAr: 'حمايات الحديد أو الألمنيوم أو الزجاج للشرفات والأدراج', 
    descEn: 'Iron, aluminum, or glass protections for balconies and stairs' 
  },
];

interface Props {
  selectedProperty?: any;
}

export default function FinishingRequestForm({ selectedProperty }: Props) {
  const [isEn, setIsEn] = useState<boolean>(false);

  useEffect(() => {
    const checkLanguage = () => {
      const htmlLang = document.documentElement.lang || document.dir;
      setIsEn(htmlLang.includes('en') || document.documentElement.dir === 'ltr');
    };

    checkLanguage();
    const observer = new MutationObserver(checkLanguage);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });

    return () => observer.disconnect();
  }, []);

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');

  const [isFullPackage, setIsFullPackage] = useState<boolean>(false);
  const [subType, setSubType] = useState<'internal' | 'external'>('internal');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const [tenderDays, setTenderDays] = useState<number>(7);
  const [enableTimeExtension, setEnableTimeExtension] = useState<boolean>(true);
  const [extensionMinutes, setExtensionMinutes] = useState<number>(30);

  const goToStep = (step: 1 | 2 | 3) => {
    setSlideDirection(step > currentStep ? 'next' : 'prev');
    setCurrentStep(step);
  };

  const handleSubTypeChange = (type: 'internal' | 'external') => {
    setSubType(type);
    setIsFullPackage(false);
    setSelectedServices(prev => {
      const validIds = ALL_SERVICES.filter(s => s.category === type).map(s => s.id);
      return prev.filter(id => validIds.includes(id));
    });
  };

  const toggleFullPackage = () => {
    setIsFullPackage(prev => !prev);
  };

  const toggleService = (id: string) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllVisible = (servicesToSelect: ServiceItem[]) => {
    const visibleIds = servicesToSelect.map(s => s.id);
    const allSelected = visibleIds.every(id => selectedServices.includes(id));

    if (allSelected) {
      setSelectedServices(prev => prev.filter(id => !visibleIds.includes(id)));
    } else {
      setSelectedServices(prev => Array.from(new Set([...prev, ...visibleIds])));
    }
  };

  const formatMinutesLabel = (mins: number) => {
    if (isEn) {
      if (mins < 60) return `${mins} mins`;
      if (mins === 60) return '1 hour (60m)';
      if (mins === 1440) return 'Full Day (24 hrs)';
      const hours = Math.floor(mins / 60);
      return `${hours} hours`;
    }
    if (mins < 60) return `${mins} دقيقة`;
    if (mins === 60) return 'ساعة واحدة (60 د)';
    if (mins === 1440) return 'يوم كامل (24 ساعة)';
    const hours = Math.floor(mins / 60);
    return `${hours} ساعات`;
  };

  const formatDaysLabel = (days: number) => {
    if (isEn) {
      if (days === 1) return '1 Day (24 hrs)';
      if (days === 7) return '1 Week (7 days)';
      if (days === 14) return '2 Weeks (14 days)';
      if (days === 30) return '1 Month (30 days)';
      return `${days} Days`;
    }
    if (days === 1) return 'يوم واحد (24 ساعة)';
    if (days === 7) return 'أسبوع كامل (7 أيام)';
    if (days === 14) return 'أسبوعان (14 يوماً)';
    if (days === 30) return 'شهر كامل (30 يوماً)';
    return `${days} يوماً`;
  };

  const displayedServices = isFullPackage
    ? ALL_SERVICES
    : ALL_SERVICES.filter(s => s.category === subType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      propertyId: selectedProperty?.id,
      propertyTitle: selectedProperty?.title,
      finishingMode: isFullPackage ? 'full' : subType,
      selectedServices: ALL_SERVICES.filter(s => selectedServices.includes(s.id)).map(s => isEn ? s.titleEn : s.titleAr),
      tenderDurationDays: tenderDays,
      enableTimeExtension,
      extensionMinutes: enableTimeExtension ? extensionMinutes : 0,
    };
    console.log('Tender Payload:', payload);
    alert(isEn ? 'Tender request published successfully!' : 'تم نشر طلب المناقصة بنجاح!');
  };

  return (
    <div className="finishing-form-container" style={{ direction: isEn ? 'ltr' : 'rtl' }}>
      {selectedProperty && (
        <div style={{ marginBottom: '15px', padding: '10px 15px', background: 'rgba(30,58,76,0.1)', borderRadius: '8px', fontSize: '0.95rem' }}>
          {isEn ? `Selected Property: ${selectedProperty.title}` : `العقار المحدد للمناقصة: ${selectedProperty.title}`}
        </div>
      )}

      <div className="wizard-header">
        <div className="wizard-title-row">
          <h2>{isEn ? 'Create Finishing & Tender Request' : 'إنشاء طلب إكساء ومناقصة'}</h2>
          <span className="selected-counter">
            {isEn ? `${selectedServices.length} Selected` : `${selectedServices.length} خدمات محددة`}
          </span>
        </div>

        <div className="steps-indicator">
          <button
            type="button"
            className={`step-pill ${currentStep === 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}
            onClick={() => goToStep(1)}
          >
            <span className="step-num">1</span>
            <span>{isEn ? 'Finishing & Services' : 'نوع الإكساء والخدمات'}</span>
          </button>
          <div className={`step-line ${currentStep >= 2 ? 'filled' : ''}`} />
          <button
            type="button"
            className={`step-pill ${currentStep === 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}
            onClick={() => selectedServices.length > 0 && goToStep(2)}
            disabled={selectedServices.length === 0}
          >
            <span className="step-num">2</span>
            <span>{isEn ? 'Tender & Timer' : 'وقت المناقصة والعداد'}</span>
          </button>
          <div className={`step-line ${currentStep === 3 ? 'filled' : ''}`} />
          <button
            type="button"
            className={`step-pill ${currentStep === 3 ? 'active' : ''}`}
            onClick={() => selectedServices.length > 0 && goToStep(3)}
            disabled={selectedServices.length === 0}
          >
            <span className="step-num">3</span>
            <span>{isEn ? 'Review & Publish' : 'المراجعة والنشر'}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="wizard-body">
        {currentStep === 1 && (
          <div key="step-1" className={`page-view slide-${slideDirection}`}>
            <div
              className={`full-finishing-banner ${isFullPackage ? 'active-full' : ''}`}
              onClick={toggleFullPackage}
            >
              <div className="banner-content">
                <h3>{isEn ? 'Full Finishing Package (Internal + External)' : 'عرض الإكساء الكامل (داخلي + خارجي)'}</h3>
                <p>
                  {isFullPackage
                    ? (isEn ? 'Full finishing mode enabled! All internal & external services are displayed below.' : 'تم تفعيل وضع الإكساء الكامل! جميع الخدمات الداخلية والخارجية معروضة بالأسفل.')
                    : (isEn ? 'Click here to merge and display all internal and external finishing services in one list.' : 'اضغط هنا لدمج وعرض كافة خدمات الإكساء الداخلي والخارجي معاً في قائمة واحدة.')}
                </p>
              </div>
              <div className="banner-action">
                <span className="banner-toggle-btn">
                  {isFullPackage ? (isEn ? '✓ Active (Cancel)' : '✓ مفعل حالياً (إلغاء)') : (isEn ? 'Enable Full Package' : 'تفعيل الإكساء الكامل')}
                </span>
              </div>
            </div>

            <div className={`sub-type-wrapper ${isFullPackage ? 'hidden-panel' : 'visible-panel'}`}>
              <label className="section-label">{isEn ? 'Or choose a specific finishing phase (Exclusive):' : 'أو اختر مرحلة إكساء محددة (حصرية):'}</label>
              <div className="type-buttons">
                <button
                  type="button"
                  className={!isFullPackage && subType === 'internal' ? 'active' : ''}
                  onClick={() => handleSubTypeChange('internal')}
                >
                  {isEn ? 'Internal Finishing Only' : 'إكساء داخلي فقط'}
                </button>
                <button
                  type="button"
                  className={!isFullPackage && subType === 'external' ? 'active' : ''}
                  onClick={() => handleSubTypeChange('external')}
                >
                  {isEn ? 'External Finishing Only' : 'إكساء خارجي فقط'}
                </button>
              </div>
            </div>

            <div key={isFullPackage ? 'full-grid' : subType} className="services-section fade-scale-in">
              <div className="services-header-row">
                <h4>
                  {isFullPackage
                    ? (isEn ? 'All Internal & External Services' : 'جميع خدمات الإكساء الداخلي والخارجي')
                    : subType === 'internal'
                    ? (isEn ? 'Internal Finishing Items' : 'بنود الإكساء الداخلي')
                    : (isEn ? 'External Finishing Items' : 'بنود الإكساء الخارجي')}
                </h4>
                <button
                  type="button"
                  className="select-all-btn"
                  onClick={() => handleSelectAllVisible(displayedServices)}
                >
                  {displayedServices.every(s => selectedServices.includes(s.id))
                    ? (isEn ? 'Deselect All' : 'إلغاء تحديد الكل')
                    : (isEn ? 'Select All Visible' : 'تحديد كل المعروض')}
                </button>
              </div>

              <div className="services-grid">
                {displayedServices.map((service, index) => {
                  const isChecked = selectedServices.includes(service.id);
                  return (
                    <div
                      key={service.id}
                      style={{ animationDelay: `${index * 40}ms` }}
                      className={`service-card stagger-item ${isChecked ? 'checked' : ''}`}
                      onClick={() => toggleService(service.id)}
                    >
                      <div className="service-card-top">
                        <span className="check-indicator">{isChecked ? '✓' : ''}</span>
                        <span className="service-title">{isEn ? service.titleEn : service.titleAr}</span>
                        {isFullPackage && (
                          <span className={`category-tag ${service.category}`}>
                            {service.category === 'internal' ? (isEn ? 'Internal' : 'داخلي') : (isEn ? 'External' : 'خارجي')}
                          </span>
                        )}
                      </div>
                      <p className="service-desc">{isEn ? service.descEn : service.descAr}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="wizard-footer">
              <button
                type="button"
                className="primary-nav-btn"
                disabled={selectedServices.length === 0}
                onClick={() => goToStep(2)}
              >
                {isEn ? 'Next: Tender Timer Settings →' : 'التالي: ضبط مؤقت المناقصة ←'}
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div key="step-2" className={`page-view slide-${slideDirection}`}>
            <div className="modern-Number-card">
              <div className="number-card-header">
                <div>
                  <h3>{isEn ? 'Tender Duration' : 'مدة سريان المناقصة'}</h3>
                  <p>{isEn ? 'Min 1 day, Max 30 days (1 month)' : 'الحد الأدنى يوم واحد والحد الأقصى شهر كامل (30 يوماً)'}</p>
                </div>
                <div className="live-value-badge">{formatDaysLabel(tenderDays)}</div>
              </div>

              <div className="preset-chips">
                {[
                  { label: isEn ? '1 Day' : 'يوم واحد', val: 1 },
                  { label: isEn ? '3 Days' : '3 أيام', val: 3 },
                  { label: isEn ? '1 Week' : 'أسبوع', val: 7 },
                  { label: isEn ? '2 Weeks' : 'أسبوعان', val: 14 },
                  { label: '1 Month', val: 30 },
                ].map(item => (
                  <button
                    key={item.val}
                    type="button"
                    className={`chip-btn ${tenderDays === item.val ? 'active' : ''}`}
                    onClick={() => setTenderDays(item.val)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="interactive-stepper-row">
                <button
                  type="button"
                  className="stepper-circle-btn"
                  onClick={() => setTenderDays(prev => Math.max(1, prev - 1))}
                  disabled={tenderDays <= 1}
                >
                  −
                </button>
                <div className="slider-wrapper">
                  <input
                    type="range"
                    min={1}
                    max={30}
                    value={tenderDays}
                    onChange={e => setTenderDays(Number(e.target.value))}
                    className="modern-slider"
                  />
                  <div className="slider-labels">
                    <span>{isEn ? '1 Day' : 'يوم واحد'}</span>
                    <span>{isEn ? '15 Days' : '15 يوماً'}</span>
                    <span>{isEn ? '1 Month' : 'شهر كامل'}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="stepper-circle-btn"
                  onClick={() => setTenderDays(prev => Math.min(30, prev + 1))}
                  disabled={tenderDays >= 30}
                >
                  +
                </button>
              </div>
            </div>

            <div className="modern-Number-card">
              <div className="toggle-switch-row" onClick={() => setEnableTimeExtension(!enableTimeExtension)}>
                <div>
                  <h3>{isEn ? 'Auto Time Extension per New Bid' : 'تمديد الوقت التلقائي مع كل عرض جديد'}</h3>
                  <p>{isEn ? 'Extends timer to prevent last-minute snipes and encourage better pricing' : 'إضافة وقت للمؤقت لمنع التزايد في اللحظات الأخيرة ومنح فرصة تنافسية أفضل'}</p>
                </div>
                <div className={`modern-switch ${enableTimeExtension ? 'on' : 'off'}`}>
                  <div className="switch-handle" />
                </div>
              </div>

              {enableTimeExtension && (
                <div className="extension-controls fade-scale-in">
                  <div className="number-card-header sub-header">
                    <span>{isEn ? 'Extension time per new bid (5 mins to 24 hrs):' : 'مقدار الزيادة لكل عرض جديد (من 5 دقائق إلى يوم كامل):'}</span>
                    <div className="live-value-badge accent">{formatMinutesLabel(extensionMinutes)}</div>
                  </div>

                  <div className="preset-chips">
                    {[
                      { label: isEn ? '5 Mins' : '5 دقائق', val: 5 },
                      { label: isEn ? '15 Mins' : '15 دقيقة', val: 15 },
                      { label: isEn ? '30 Mins' : '30 دقيقة', val: 30 },
                      { label: isEn ? '1 Hour' : 'ساعة واحدة', val: 60 },
                      { label: '6 Hours', val: 360 },
                      { label: '12 Hours', val: 720 },
                      { label: isEn ? 'Full Day' : 'يوم كامل', val: 1440 },
                    ].map(item => (
                      <button
                        key={item.val}
                        type="button"
                        className={`chip-btn ${extensionMinutes === item.val ? 'active' : ''}`}
                        onClick={() => setExtensionMinutes(item.val)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  <div className="interactive-stepper-row">
                    <button
                      type="button"
                      className="stepper-circle-btn"
                      onClick={() => setExtensionMinutes(prev => Math.max(5, prev - 5))}
                      disabled={extensionMinutes <= 5}
                    >
                      −
                    </button>
                    <div className="slider-wrapper">
                      <input
                        type="range"
                        min={5}
                        max={1440}
                        step={5}
                        value={extensionMinutes}
                        onChange={e => setExtensionMinutes(Number(e.target.value))}
                        className="modern-slider"
                      />
                      <div className="slider-labels">
                        <span>{isEn ? '5 Mins' : '5 دقائق'}</span>
                        <span>{isEn ? '12 Hours' : '12 ساعة'}</span>
                        <span>{isEn ? 'Full Day' : 'يوم كامل'}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="stepper-circle-btn"
                      onClick={() => setExtensionMinutes(prev => Math.min(1440, prev + 15))}
                      disabled={extensionMinutes >= 1440}
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="wizard-footer split">
              <button type="button" className="secondary-nav-btn" onClick={() => goToStep(1)}>
                {isEn ? '← Back to Services' : '→ العودة للخدمات'}
              </button>
              <button type="button" className="primary-nav-btn" onClick={() => goToStep(3)}>
                {isEn ? 'Next: Review Request →' : 'التالي: مراجعة الطلب ←'}
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div key="step-3" className={`page-view slide-${slideDirection}`}>
            <div className="summary-card">
              <h3>{isEn ? 'Finishing & Tender Request Summary' : 'ملخص طلب الإكساء والمناقصة'}</h3>

              <div className="summary-grid">
                <div className="summary-box">
                  <span className="summary-label">{isEn ? 'Finishing Scope' : 'نطاق الإكساء'}</span>
                  <strong>
                    {isFullPackage 
                      ? (isEn ? 'Full Package (Internal & External)' : 'إكساء كامل شامل (داخلي وخارجي)') 
                      : subType === 'internal' 
                      ? (isEn ? 'Exclusive Internal' : 'إكساء داخلي حصري') 
                      : (isEn ? 'Exclusive External' : 'إكساء خارجي حصري')}
                  </strong>
                </div>
                <div className="summary-box">
                  <span className="summary-label">{isEn ? 'Base Tender Duration' : 'مدة المناقصة الأساسية'}</span>
                  <strong>{formatDaysLabel(tenderDays)}</strong>
                </div>
                <div className="summary-box">
                  <span className="summary-label">{isEn ? 'Auto-Extension per Bid' : 'الزيادة التلقائية لكل عرض'}</span>
                  <strong>{enableTimeExtension ? `+ ${formatMinutesLabel(extensionMinutes)}` : (isEn ? 'Disabled (Fixed Time)' : 'غير مفعلة (وقت ثابت)')}</strong>
                </div>
              </div>

              <div className="summary-services-list">
                <h4>{isEn ? `Selected Services (${selectedServices.length}):` : `الخدمات المطلوبة للتسعير (${selectedServices.length}):`}</h4>
                <div className="selected-tags-wrap">
                  {ALL_SERVICES.filter(s => selectedServices.includes(s.id)).map(s => (
                    <span key={s.id} className="summary-service-tag">
                      ✓ {isEn ? s.titleEn : s.titleAr}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="wizard-footer split">
              <button type="button" className="secondary-nav-btn" onClick={() => goToStep(2)}>
                {isEn ? '← Edit Timer' : '→ تعديل الوقت'}
              </button>
              <button type="submit" className="submit-final-btn">
                {isEn ? 'Confirm & Publish Tender' : 'اعتماد ونشر المناقصة الآن'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}