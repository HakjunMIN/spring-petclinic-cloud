
package org.springframework.samples.petclinic.web;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.samples.petclinic.Clinic;
import org.springframework.samples.petclinic.PetType;
import org.springframework.samples.petclinic.Vets;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

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
public class ClinicController {

	private final Clinic clinic;


	@Autowired
	public ClinicController(Clinic clinic) {
		this.clinic = clinic;
	***REMOVED***

	/**
	 * Custom handler for the welcome view.
	 * <p***REMOVED***
	 * Note that this handler relies on the RequestToViewNameTranslator to
	 * determine the logical view name based on the request URL: "/welcome.do"
	 * -&gt; "welcome".
	 */
	@RequestMapping("/")
	public String welcomeHandler() {
		return "welcome";
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
		vets.getVetList().addAll(this.clinic.getVets());
		model.addAttribute("vets", vets);
		return "vetsList";
	***REMOVED***

	/**
	 * Custom handler for displaying an owner.
	 *
	 * @param ownerId the ID of the owner to display
	 * @return a ModelMap with the model attributes for the view
	 */
	@RequestMapping("/owners/{ownerId***REMOVED***")
	public ModelAndView showOwner(@PathVariable("ownerId") int ownerId) {
		ModelAndView mav = new ModelAndView("owners/ownerDetails");
		mav.addObject(this.clinic.findOwner(ownerId));
		return mav;
	***REMOVED***

	/**
	 * Custom handler for displaying an list of visits.
	 *
	 * @param petId the ID of the pet whose visits to display
	 * @return a ModelMap with the model attributes for the view
	 */
	@RequestMapping(value="/owners/*/pets/{petId***REMOVED***/visits", method=RequestMethod.GET)
	public ModelAndView visitsHandler(@PathVariable int petId) {
		ModelAndView mav = new ModelAndView("visits");
		mav.addObject("visits", this.clinic.findPet(petId).getVisits());
		return mav;
	***REMOVED***

***REMOVED***
