//
//  WelcomeScreenViewController.swift
//  WeshAdminGQL
//
//  Created by Dino Pelic on 7/23/17.
//  Copyright © 2017 Dino Pelic. All rights reserved.
//

import UIKit

protocol WelcomeOutput {
    func fetchAgain()
}

class WelcomeScreenViewController: UIViewController {

    @IBOutlet weak var orderListBtn: UIButton!
    
    var output: WelcomeOutput?
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        self.orderListBtn.addTarget(self, action: #selector(self.goToList), for: .touchUpInside)
        
        self.title = "Početna"
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func goToList() {
        let OrderListStoryboard: UIStoryboard = UIStoryboard(name: "OrderList", bundle: nil)
        let nextController = OrderListStoryboard.instantiateViewController(withIdentifier: "OrderListViewController") as! OrderListViewController
        self.output = nextController
        self.output?.fetchAgain()
        self.navigationController?.pushViewController(nextController, animated: true)
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
