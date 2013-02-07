
package org.springframework.samples.petclinic.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.samples.petclinic.Vets;
import org.springframework.samples.petclinic.service.ClinicService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Annotation-driven <em***REMOVED***MultiActionController</em***REMOVED*** that handles all non-form
 * URL's.
 *
 * @author Juergen Hoeller
 * @author Mark Fisher
 * @author Ken Krebs
 * @author Arjen Poutsma
 */
@Controller
public class VetController {

	private final ClinicService clinicService;


	@Autowired
	public VetController(ClinicService clinicService) {
		this.clinicService = clinicService;
	***REMOVED***

	/**
	 * Custom handler for displaying vets.
	 *
	 * <p***REMOVED***Note that this handler returns a plain {@link ModelMap***REMOVED*** object instead of
	 * a ModelAndView, thus leveraging convention-based model attribute names.
	 * It relies on the RequestToViewNameTranslator to determine the logical
	 * view name based on the request URL: "/vets.do" -&gt; "vets".
	 *
	 * @return a ModelMap with the model attributes for the view
	 */
	@RequestMapping("/vets")
	public String showVetList(Model model) {
		Vets vets = new Vets();
		vets.getVetList().addAll(this.clinicService.findVets());
		model.addAttribute("vets", vets);
		return "vets/vetList";
	***REMOVED***





***REMOVED***
